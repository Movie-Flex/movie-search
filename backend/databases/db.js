// require('dotenv').config();
// const { MongoClient } = require('mongodb');

// const uri = process.env.MONGOOSE_URL;

// async function connectToDatabase(dbName, collectionName) {
//   const client = new MongoClient(uri);
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection(collectionName);
//   return { client, collection }; 
// }

// module.exports = { connectToDatabase };
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function connectToDatabase(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // console.log("Conected to the database");
    return { client, collection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
