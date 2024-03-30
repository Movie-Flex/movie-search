const { connectToDatabase } = require('../databases/db');
const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const collection_name = 'subscriptions'
const { isAdmin } = require('../middlewares/admin');
const { ObjectId } = require('mongodb');

const { verifyToken } = require('../middlewares/verifyToken');


function isValidMovieData(movieData) {
  return movieData && movieData.title && movieData.plot && movieData.year && movieData.directors && movieData.imdb;
}

const addMovie = async (req, res) => {
  let client;
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(400).json({ error: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: 'No authentication token found' });
    }
    //console.log(token);
    let role = false;
    //console.log(role);
    role = await isAdmin(token);
    //console.log(role);
    if (!role) {
      return res.status(400).json({ error: 'You dont have permission to perform this operation' });
    }
    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
    client = connectedClient;

    const { movieData } = req.body
    // console.log(movieData);
    if (!isValidMovieData(movieData)) {
      return res.status(400).json({ error: 'No Movie Data found' });
    }

    const result = await collection.insertOne(movieData);
    return res.status(200).json({ message: `Movie ${movieData.title} added successfully` });
  } catch (err) {
    console.error('Error creating movies:', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
      console.log("[CONNECTION CLOSED]")
    }
  }
};

const deleteMovie = async (req, res) => {
  let client;
  try {
    console.log("[HITTED API FOR THE DELERING MOVIE]")
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(400).json({ error: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: 'No authentication token found' });
    }
    //console.log(token);
    let role = false;
    //console.log(role);
    role = await isAdmin(token);
    //console.log(role);
    if (!role) {
      return res.status(400).json({ error: 'You dont have permission to perform this operation' });
    }

    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
    client = connectedClient;

    const id = req.params.id;
    // console.log(id);
    const result = await collection.deleteOne({ "_id": new ObjectId(id) });
    if (result.deletedCount == 0) {
      return res.status(400).json({ message: "Error deleting movie" });
    }
    // console.log(result);
    return res.status(200).json({ message: `Deleted Successfully` });
  } catch (err) {
    console.error('Error deleting movies:', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

const updateMovie = async (req, res) => {
  let client;
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(400).json({ error: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: 'No authentication token found' });
    }
    //console.log(token);
    let role = false;
    //console.log(role);
    role = await isAdmin(token);
    //console.log(role);
    if (!role) {
      return res.status(400).json({ error: 'You dont have permission to perform this operation' });
    }

    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
    client = connectedClient;

    const id = req.params.id;
    const { movieData } = req.body;
    const result = await collection.updateOne({
      "_id": new ObjectId(id)
    }, {
      $set: movieData
    });
    // console.log(result);
    if (result.modifiedCount == 0) {
      return res.status(400).json({ message: "Error updating movie" });
    }


    return res.status(200).json({ message: "Movie Updated Successfully" });

  } catch (error) {
    console.log("Error in upating movies: ", err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

const getSubs = async (req, res) => {
  let client;
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(400).json({ error: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: 'No authentication token found' });
    }
    //console.log(token);
    let role = false;
    //console.log(role);
    role = await isAdmin(token);
    //console.log(role);
    if (!role) {
      return res.status(400).json({ error: 'You dont have permission to perform this operation' });
    }

    const page = parseInt(req.query.p) || 1;
    const perPage = 10;

    const { client: connectedClient, collection } = await connectToDatabase(dbName, collection_name);
    client = connectedClient;
    const totalCount = await collection.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    const skip = perPage * (page - 1);
    const subs = await collection.find().project({
      languages: 0,
      released: 0,
      awards: 0,
      lastupdated: 0,
      countries: 0,
      type: 0,
      tomatoes: 0,
      plot_embedding: 0,
    }).skip(skip).limit(perPage).toArray();


    const resposne = {
      "totalPages": totalPages,
      "totalCount": totalCount,
      "currentPage": page,
      "perPage": perPage,
      "data": subs,
    }
    return res.status(200).json(resposne);
  } catch (err) {
    return res.status(500).json({ message: JSON.stringify(err) });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

module.exports = {
  addMovie: [verifyToken, addMovie],
  deleteMovie: [verifyToken, deleteMovie],
  updateMovie: [verifyToken, updateMovie],
  getSubs: [verifyToken, getSubs]
};
