const {MongoClient} = require('mongodb');
const fs = require('fs');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

};

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

async function main(){

  const uri = await readMongoDBUri(); // Utiliser la fonction pour lire l'URI
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

    // Show first document in mflix datase and collection movies
    const arattanavongDB = client.db("arattanavong");  // Renamed variable
    const userCollection = arattanavongDB.collection("User");  // Renamed variable

    // Fetch all users from the "User" collection
    const users = await userCollection.find().toArray();
    console.log("All Users:", users);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);