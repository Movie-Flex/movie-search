const { text } = require('express');
const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';

const getMovies = async (req, res) => {
  let client;
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(209).json({ message: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(209).json({ message: 'No authentication token found' });
    }
    const query = req.query.q;
    let { toSearch } = req.body;
    if (!query) {
      return res.status(209).json({ message: 'Query parameter is required' });
    }
    if (!toSearch || toSearch.length==0) {
      toSearch = ["all"];
    }
    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
    client = connectedClient;


    let must=[
      {
        text: {
          query: query,
          path: "title"
        }
      },
    ]
    if(toSearch[0]!=="all"){
      must.push({
        text: {
          query: toSearch,
          path: "genres"
        }
      })
    }
    // Create the aggregation pipeline with the $search stage
    const pipeline = [
      {
        $search: {
          index: 'default',
          compound: {
            must: must
          }
        }
      },
      {
        $limit:8
      },
      {
        $project: {
          _id: 1,
          title: 1,
          poster: 1,
          imdb: 1,
          year: 1,
          genres: 1
        },
      },
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
