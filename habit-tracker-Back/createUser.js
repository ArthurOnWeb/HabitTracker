const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Le nombre de tours pour le hachage

async function createUser(username, email, password) {
  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  const uri = "mongodb://arattanavong:cailloux@193.48.125.44:27017/?authMechanism=DEFAULT&authSource=admin";
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the "arattanavong" database and "User" collection
    const arattanavongDB = client.db("arattanavong");
    const userCollection = arattanavongDB.collection("User");

    // Insert the new user into the "User" collection
    const result = await userCollection.insertOne(user);

    // Print a message indicating success
    console.log(`User created with ID: ${result.insertedId}`);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Example usage:
createUser("JohnDoe", "john@example.com", "securePassword");
