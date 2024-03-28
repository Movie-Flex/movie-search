const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';

const fuzzySearch = async (req, res) => {
  let client;
  try {
    const query = req.query.q;
    const genres = req.query.g;

    if (!query) {
      return res.status(209).json({ message: 'Query is required' });
    }
    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
    client = connectedClient;
    const searchStage = {
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
    };

    const projectStage = {
      $project: {
        languages: 0,
        released: 0,
        awards: 0,
        lastupdated: 0,
        countries: 0,
        type: 0,
        tomatoes: 0,
        plot_embedding: 0,
      }
    };

    // const setScoreStage = {
    //   $set: {
    //     score: {
    //       $meta: 'searchScore'
    //     }
    //   }
    // };

    // const facetStage = {
    //   $facet: {
    //     rows: [
    //       { $skip: 10 * page },
    //       { $limit: 10 }
    //     ],
    //     totalRows: [
    //       { $replaceWith: '$$SEARCH_META' },
    //       { $limit: 1 }
    //     ]
    //   }
    // };

    // const setTotalRowsStage = {
    //   $set: {
    //     totalRows: {
    //       $arrayElemAt: ['$totalRows', 0]
    //     },
    //   }
    // };

    const limitstage = {
      $limit: 20
    };

    const pipeline = [searchStage, projectStage, limitstage];

    // // If genre filter is provided, add a match stage to filter by genre
    if (genres) {
      const matchStage = {
        $match: {
          genres: { $in: Array.isArray(genres) ? genres : [genres] }
        }
      };
      pipeline.push(matchStage);
    }
    

    // const facet = {
    //   $facet:{
    //     rows: [
    //       { "$skip": 10*page },
    //       { "$limit": 10 }
    //     ],
    //     totalRows: [
    //       { "$replaceWith": "$$SEARCH_META" },
    //       { "$limit": 1 }
    //     ]
    //   }
    // }

    // pipeline.push(facet);

    // const set = {
    //   $set: {
    //     totalRows:{
    //       $arrayElemAt: [$totalRows, 0]
    //     }
    //   }
    // }

    // pipeline.push(set);

    
    // const projectStage = {
    //   $project: {
    //     plot_embedding: 0,
    //     //paginationToken : { "$meta" : "searchSequenceToken" }
    //   }
    // };
    // pipeline.push(projectStage);
    const movies = await collection.aggregate(pipeline).toArray();



    res.status(200).json(movies);
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
