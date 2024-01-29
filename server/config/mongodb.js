
const { MongoClient, ServerApiVersion } = require('mongodb');
console.log(process.env.MONGO_URI);
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        const database = client.db('Ch1');
        const users = database.collection('users');
        
        const user = await users.find().toArray();
        console.log(user);
    } finally {
       
        await client.close();
    }
}

module.exports = connect
