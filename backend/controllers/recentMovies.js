const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { RecentMovies} = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const mongoURI = process.env.MONGODB_URI;

const addRecentMovies = async (req, res) => {
    let db;
    try {
        const { movieId, token } = req.body;
        if (!(token && movieId)) {
            return res.status(209).json({ message: "Movie id or token missing." });
        }
        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const existingUser = await RecentMovies.findOne({ email: user.email });
        if (existingUser) {
            // Update the user's recent movies array
            await RecentMovies.updateOne(
                { email: user.email },
                { $addToSet: { movieId: movieId }, $set: { lastUpdated: new Date() } }
            );
            
            
            return res.status(200).json({ message: "Successfully updated recent movies." });
        } else {
            const newRecentMovie = new RecentMovies({
                email: user.email,
                movieId: [movieId],
                lastUpdated: new Date()
            });
            newRecentMovie.save();
            return res.status(200).json({ message: "Successfully added to recent movies." });
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

const getRecentMovies = async (req, res) => {
    let client;
    let db;
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(209).json({ message: "Token missing." });
        }
        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const recentMovies = await RecentMovies.findOne({ email: user.email });

        const { client: connectedClient, collection: allMovieCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const recentMoviesIds = recentMovies.movieId;

        // Find all movies with IDs present in recentMoviesIds array
        const allMovies = await allMovieCollection.find(
            { _id: { $in: recentMoviesIds.map(id => new ObjectId(id)) } }, { plot_embedding: 0 } // Exclude the plot_embedding field(not working ??)
        ).toArray();

        return res.status(200).json({ recentMovies: allMovies });

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
    addRecentMovies: [verifyToken, addRecentMovies],
    getRecentMovies: [verifyToken, getRecentMovies]
};
