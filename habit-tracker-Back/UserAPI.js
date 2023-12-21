const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Fonction pour lire l'URI MongoDB depuis le fichier
async function readMongoDBUri() {
  try {
    const uri = fs.readFileSync('mongodb-uri.txt', 'utf8').trim();
    return uri;
  } catch (e) {
    console.error("Erreur lors de la lecture de l'URI MongoDB depuis le fichier.", e);
    process.exit(1);
  }
}

// Endpoint pour créer un utilisateur
app.post('/api/createUser', async (req, res) => {
  const { username, email, password } = req.body;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userCollection.findOne({ username: username });
    if (existingUser) {
      res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    const result = await userCollection.insertOne(user);

    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertedId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }
});

// Endpoint pour vérifier le mot de passe
app.post('/api/checkPassword', async (req, res) => {
  const { username, inputPassword } = req.body;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");

    const user = await userCollection.findOne({ username: username });

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const passwordMatch = await bcrypt.compare(inputPassword, user.password);

    if (passwordMatch) {
      res.json({ message: 'Mot de passe correct' });
    } else {
      res.status(401).json({ error: 'Mot de passe incorrect' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
