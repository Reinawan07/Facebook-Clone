
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
async function connect() {
    try {
        const database = client.db('Ch1');
        db = database;
        return database;
    } catch (error) {
        console.log(error);
    }
}

const database = client.db('Ch1');

module.exports = { connect, database } 
