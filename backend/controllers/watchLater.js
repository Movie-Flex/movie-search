const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const {  WatchLater } = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const mongoURI = process.env.MONGODB_URI;

const addWatchLaterMovies = async (req, res) => {
    let db;
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        const movieId = req.params.id
        
        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const existingUser = await WatchLater.findOne({ email: user.email });

        if (existingUser) {
            const index = existingUser.movieId.indexOf(movieId)

            if (index == -1) {  // movie not added alredy.
                await WatchLater.updateOne(
                    { email: user.email },
                    { $addToSet: { movieId: movieId }, $set: { lastUpdated: new Date() } }
                );
            }
            return res.status(200).json({ message: "Movie added to watch later." });

        } else {
            const newWatchLater = new WatchLater({
                email: user.email,
                movieId: [movieId],
                lastUpdated: new Date()
            });
            newWatchLater.save();
            return res.status(200).json({ message: "Successfully added movie to watch later." });
        }
    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            db.close();
        }
    }
};

const getWatchLaterMovies = async (req, res) => {
    let client;
    let db;
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(400).json({ error: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(400).json({ error: 'No authentication token found in bearer.' });
        }

        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const watchLaterMovies = await WatchLater.findOne({ email: user.email });

        const { client: connectedClient, collection: allMovieCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const watchLaterMoviesIds = watchLaterMovies.movieId;
        
        const allMovies = await allMovieCollection.find(
            { _id: { $in: watchLaterMoviesIds.map(id => new ObjectId(id)) } }, { plot_embedding: 0 } // Exclude the plot_embedding field(not working ??)
        ).toArray();

        return res.status(200).json({ watchLaterMovies: allMovies });

    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            client.close();
        }
    }
};

module.exports = {
    addWatchLaterMovies: [verifyToken, addWatchLaterMovies],
    getWatchLaterMovies: [verifyToken, getWatchLaterMovies]
};
