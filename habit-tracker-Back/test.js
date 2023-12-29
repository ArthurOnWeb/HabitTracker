const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){

    const uri = 'mongodb://arattanavong:cailloux@193.48.125.44:27017/?authMechanism=DEFAULT&authSource=admin';
    const client = new MongoClient(uri);

    try{
        await client.connect();
        const db = client.db("arattanavong");
        const userCollection = db.collection("User")
        const users = await userCollection.find().toArray();
        console.log('List of users :', users);
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close()
    }

}

