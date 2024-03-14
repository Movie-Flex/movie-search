require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGOOSE_URL;

async function connectToDatabase(dbName, collectionName) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return { client, collection }; 
}

module.exports = { connectToDatabase };
