const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function checkPassword(username, inputPassword) {
  const uri = "mongodb://arattanavong:cailloux@193.48.125.44:27017/?authMechanism=DEFAULT&authSource=admin";
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the "arattanavong" database and "User" collection
    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");

    // Find the user by username
    const user = await userCollection.findOne({ username: username });

    // Si l'utilisateur n'est pas trouvé, le mot de passe est incorrect
    if (!user) {
      console.log("Utilisateur non trouvé");
      return false;
    }

    // Comparer le mot de passe fourni avec le hachage stocké
    const passwordMatch = await bcrypt.compare(inputPassword, user.password);

    if (passwordMatch) {
      console.log("Mot de passe correct");
      return true;
    } else {
      console.log("Mot de passe incorrect");
      return false;
    }
  } catch (e) {
    console.error(e);
  } finally {
    // Fermer la connexion MongoDB
    await client.close();
  }
}

// Example usage:
const inputUsername = "JohnDoe";
const inputPassword = "securePassword";

checkPassword(inputUsername, inputPassword);
