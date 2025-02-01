const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/nabaunadhim';
const client = new MongoClient(url);

let db;

async function dbConnect() {
    if (!db) {
        try {
            await client.connect();
            console.log("Connected to MongoDB!");
            db = client.db("nabaunadhim");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
    return db;
}

function isClientConnected() {
    return client && client.topology && client.topology.isConnected();
}

async function dbClose() {
    if (client) {
        await client.close();
        if(isClientConnected())
            console.log( "Error in disconnecting MongoDB connection.");
        else
            console.log("MongoDB connection closed.");
    }
}

module.exports = { dbConnect, dbClose };
