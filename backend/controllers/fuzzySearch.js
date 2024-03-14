const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';

const fuzzySearch = async (req, res) => {
  let client;
  try {
    const  query  = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Connect to the database and get client and collection
    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
    client = connectedClient; // Assign client

    // Create the aggregation pipeline with the $search stage
    const pipeline = [
      {
        $search: {
          index: 'default',
          text: {
            query: query,
            path: 'title',
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        }
      }
    ];

    const movies = await collection.aggregate(pipeline).toArray();

    res.json(movies);
  } catch (err) {
    console.error('Error retrieving movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

module.exports = { fuzzySearch };
