const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { FavouriteMovies } = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const mongoURI = process.env.MONGODB_URI;

const addFavouriteMovies = async (req, res) => {
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

        if (!(movieId)) {
            return res.status(209).json({ message: "Movie id missing." });
        }
        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const existingUser = await FavouriteMovies.findOne({ email: user.email });
        if (existingUser) {
            const index = existingUser.movieId.indexOf(movieId)

            if (index == -1) {  // movie not added alredy.
                await FavouriteMovies.updateOne(
                    { email: user.email },
                    { $addToSet: { movieId: movieId }, $set: { lastUpdated: new Date() } }
                );
            }
            return res.status(200).json({ message: "Successfully updated  favourite movies." });
        } else {
            const newFavouriteMovies = new FavouriteMovies({
                email: user.email,
                movieId: [movieId],
                lastUpdated: new Date()
            });
            newFavouriteMovies.save();
            return res.status(200).json({ message: "Successfully added to favourite movies." });
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

const getFavouriteMovies = async (req, res) => {
    let client;
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

        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const favouriteMovies = await FavouriteMovies.findOne({ email: user.email });

        const { client: connectedClient, collection: allMovieCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const favouriteMoviesIds = favouriteMovies.movieId;

        if(!(favouriteMovies) ){
            return res.status(200).json({ favouriteMovies: [] });
        }
        const allMovies = await allMovieCollection.find(
            { _id: { $in: favouriteMoviesIds.map(id => new ObjectId(id)) } }, { plot_embedding: 0 } // Exclude the plot_embedding field(not working ??)
        ).toArray();
        
        
        return res.status(200).json({ favouriteMovies: allMovies });

    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            client.close();
        }
    }
};

const deleteFavouriteMovie = async (req, res) => {
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

        if (!(movieId)) {
            return res.status(209).json({ message: "Movie id missing." });
        }
        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const existingUser = await FavouriteMovies.findOne({ email: user.email });
        if (existingUser) {
            await existingUser.updateOne({ $pull: { movieId: movieId } });
            return res.status(200).json({ message: "Successfully removed from  favourite movies." });
        }else {

        return res.status(209).json({ message: "Nothing to delete." });
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


module.exports = {
    addFavouriteMovies: [verifyToken, addFavouriteMovies],
    getFavouriteMovies: [verifyToken, getFavouriteMovies],
    deleteFavouriteMovie: [verifyToken, deleteFavouriteMovie]
};
