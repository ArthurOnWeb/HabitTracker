const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

};

async function main(){

  const user = "arattanavong"
  const password = "cailloux"
  const adress = "193.48.125.44"

  const uri = "mongodb://" + user + ":" + password + "@" + adress + ":27017/?authMechanism=DEFAULT&authSource=admin"
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