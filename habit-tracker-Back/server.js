const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const cors = require('cors');
const { error } = require('console');

const app = express();
const port = 3000;

// Utilise le middleware cors
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));


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

async function connectDb(){
  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);
  await client.connect();
  const arattanavongDB = client.db("arattanavong");
  return arattanavongDB;
}

async function closeClient(){
  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);
  await client.close()
}
// Endpoint pour créer un utilisateur
app.post('/api/createUser', async (req, res) => {
  const {username, password, confirmPassword} = req.body

  

  try {
    

    const db = connectDb();
    const userCollection = (await db).collection("User");

    
    if(password !== confirmPassword){
      return res.status(400).json({error: 'Passwords do not match. '});
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userCollection.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
      
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      username: username,
      email: `${username}@example.com`,
      password: hashedPassword,
    };

    const result = await userCollection.insertOne(user);

    // Génération du token d'authentification
    const token = jwt.sign({ userId: user._id }, 'Jsed_hsfkd%5');
    res.status(201).json({ token });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await closeClient();
  }
});



// Endpoint pour obtenir l'ID d'un utilisateur par son nom d'utilisateur
app.get('/api/getUserId/:username', async (req, res) => {
    const { username } = req.params;
  
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
  
      res.json({ userId: user._id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } finally {
      await client.close();
    }
  });

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = connectDb();
    const userCollection = (await db).collection("User");
    const user = await userCollection.findOne({ username });

    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
  closeClient()
});
  



  // const { username, inputPassword } = req.body;

  // const uri = await readMongoDBUri();
  // const client = new MongoClient(uri);

  // try {
  //   await client.connect();

  //   const arattanavongDB = client.db("arattanavong");
  //   const userCollection = arattanavongDB.collection("User");

  //   const user = await userCollection.findOne({ username: username });

  //   if (!user) {
  //     res.status(401).json({ message: 'Utilisateur non trouvé' });
      
  //   }
  //   return bcrypt.compare(inputPassword, user.password);
    
  // } catch (e) {
  //   console.log("erreur");
  //   res.status(500).json({ error: 'Erreur interne du serveur' });
  //   return false;
  // } finally {
  //   await client.close();
  // }


// Endpoint pour créer une habitude pour un utilisateur donné
app.post('/api/createHabit/:username', async (req, res) => {
  const { username } = req.params;
  const { habitName, frequency, duration,description} = req.body;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");
    const habitCollection = arattanavongDB.collection("Habits");

    // Vérifier si l'utilisateur existe
    const user = await userCollection.findOne({ username: username });
    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    // Créer l'habitude
    const habit = {
      username: username,
      habitName: habitName,
      frequency: frequency,
      description:description,
      history:[]
    };

    const result = await habitCollection.insertOne(habit);

    res.status(201).json({ message: 'Habitude créée avec succès', habitId: result.insertedId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }
});

// Endpoint pour supprimer une habitude pour un utilisateur donné
app.delete('/api/deleteHabit/:habitId', async (req, res) => {
  const { habitId } = req.params;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const habitCollection = arattanavongDB.collection("Habits");

    // Vérifier si l'habitude existe
    const habit = await habitCollection.findOne({ _id: new ObjectId(habitId) });
    if (!habit) {
      res.status(404).json({ error: 'Habitude non trouvée' });
      return;
    }

    // Supprimer l'habitude
    const result = await habitCollection.deleteOne({ _id: new ObjectId(habitId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Habitude supprimée avec succès' });
    } else {
      res.status(500).json({ error: 'Échec de la suppression de l\'habitude' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }  
});

// Endpoint pour récupérer les habitudes d'un utilisateur donné
app.get('/api/getHabits/:username', async (req, res) => {
  const { username } = req.params;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const habitCollection = arattanavongDB.collection("Habits");

    // Récupérer les habitudes de l'utilisateur
    const habits = await habitCollection.find({ username: username }).toArray();

    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }
});

// Endpoint pour ajouter une date à l'historique d'une habitude
app.post('/api/addDateToHistory/:habitId', async (req, res) => {
  const { habitId } = req.params;
  const { date } = req.body;

  const uri = await readMongoDBUri();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const arattanavongDB = client.db("arattanavong");
    const habitCollection = arattanavongDB.collection("Habits");

    // Vérifier si l'habitude existe
    const habit = await habitCollection.findOne({ _id: new ObjectId(habitId) });
    if (!habit) {
      res.status(404).json({ error: 'Habitude non trouvée' });
      return;
    }

    // Ajouter la date à l'historique
    const result = await habitCollection.updateOne(
      { _id: new ObjectId(habitId) },
      { $push: { history: date } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Date ajoutée à l\'historique avec succès' });
    } else {
      res.status(500).json({ error: 'Échec de l\'ajout de la date à l\'historique' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  } finally {
    await client.close();
  }
});




// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
