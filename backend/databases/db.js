
require('dotenv').config();

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

// for databases which do not have defined schema here like embeded_movies collection
async function connectToDatabase(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return { client, collection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// for databases which uses schma defined here like user, role , etc.
const connectToDatabaseWithSchema = async (mongoURI) => {
  try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
};


module.exports = { connectToDatabase,connectToDatabaseWithSchema };
