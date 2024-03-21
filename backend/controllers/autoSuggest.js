const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';

const getMovies = async (req, res) => {
  let client; 
  try {
    const  query  = req.query.q; 

    if (!query) {
      return res.status(204).json({ message: 'Query parameter is required' });
    }

    const { client : connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
    client = connectedClient; 

    // Create the aggregation pipeline with the $search stage
    const pipeline = [
      {
        $search: {
          index: 'default',
          text: {
            query: query,
            path: 'title' // Adjusted to search in the 'title' field
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

module.exports = { getMovies };
