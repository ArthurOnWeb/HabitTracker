const { MongoClient } = require('mongodb');
const fs = require('fs');

async function readMongoDBUri() {
  try {
    // Lire l'URI depuis le fichier mongodb-uri.txt
    const uri = fs.readFileSync('mongodb-uri.txt', 'utf8').trim();
    return uri;
  } catch (e) {
    console.error("Erreur lors de la lecture de l'URI MongoDB depuis le fichier.", e);
    process.exit(1);
  }
}

async function deleteUser(username) {
  const uri = await readMongoDBUri();

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the "arattanavong" database and "User" collection
    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");

    // Supprimer l'utilisateur en fonction de son nom d'utilisateur
    const result = await userCollection.deleteOne({ username: username });

    // Vérifier si un utilisateur a été supprimé
    if (result.deletedCount === 1) {
      console.log(`Utilisateur ${username} supprimé avec succès`);
    } else {
      console.log(`Utilisateur ${username} non trouvé`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    // Fermer la connexion MongoDB
    await client.close();
  }
}

// Exemple d'utilisation :
const usernameToDelete = "JohnDoe";

deleteUser(usernameToDelete);