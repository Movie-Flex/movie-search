const { connectToDatabase } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';

const addRecentMovies = async (req, res) => {
    let client;
    try {
        const { movieId, token } = req.body;
        if (!(token && movieId)) {
            return res.status(209).json({ message: "Movie id or token missing." });
        }
        const user = getUser(token);

        const { client: connectedClient, collection: movieCollection } = await connectToDatabase(dbName, 'recentMovies');
        client = connectedClient;

        const alreadyAddedMovie = await movieCollection.findOne({ $and: [{ email: user.email }, { movieId: movieId }] });
        if (alreadyAddedMovie) {
            await movieCollection.updateOne({ email: user.email, movieId: movieId }, { $set: { addedOn: new Date() } });
            return res.status(200).json({ message: "Successfully updated movies in user database." });
        }

        const addNewMovie = {
            email: user.email,
            movieId: movieId,
            addedOn: new Date()
        };

        await movieCollection.insertOne(addNewMovie);
        return res.status(200).json({ message: "Successfully added movies to user database." });

    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            client.close();
        }
    }
};

const getRecentMovies = async (req, res) => {
    let client;
    let allMovieClient;
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(209).json({ message: "Token missing." });
        }
        const user = getUser(token);

        // Connect to the recentMovies collection
        const { client: connectedClient, collection: movieCollection } = await connectToDatabase(dbName, 'recentMovies');
        client = connectedClient;

        // Connect to the embedded_movies collection
        const { client: allMovieConnectedClient, collection: allMovieCollection } = await connectToDatabase(dbName, 'embedded_movies');
        allMovieClient = allMovieConnectedClient;

        const addedMovies = await movieCollection.find({ email: user.email }).sort({ addedOn: -1 }) .limit(10).toArray();   // Limit to 10 entries

        const addedMoviesIds = addedMovies.map(movie => movie.movieId);
        // const addedMoviesIds = addedMovies.map(movie => new ObjectId(movie.movieId));
        const allMovies = await allMovieCollection.find(
            { _id: { $in: addedMoviesIds.map(id => new ObjectId(id)) } }, { plot_embedding: 0 } // Exclude the plot_embedding field(not working ??)
        ).toArray();

        return res.status(200).json({ recentMovies: allMovies });

    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            client.close();
        }
        if (allMovieClient) {
            allMovieClient.close();
        }
    }
};





module.exports = {
    addRecentMovies: [verifyToken, addRecentMovies],
    getRecentMovies: [verifyToken, getRecentMovies]
};
