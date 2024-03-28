// this returns if a movie is favourite or not  , watchlater or not and rating of a movie

const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { FavouriteMovies, watchHistory, WatchLater, RatedMovies } = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const mongoURI = process.env.MONGODB_URI;

const movieStatus = async (req, res) => {
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

        let watchLater = false;
        let favouriteMovie = false;
        let rating = 0 ;

        // rating
        const ratedMovies = await RatedMovies.findOne({ email: user.email });
        if (ratedMovies) {
            const index = ratedMovies.vote.movieId.indexOf(movieId)
            // if movie is present .
            if (index != -1) {
                rating = ratedMovies.vote.rating[index];
            }
        }
        // watchlater
        const watchLaterMovies = await WatchLater.findOne({ email: user.email });
        if (watchLaterMovies) {
            const index = watchLaterMovies.movieId.indexOf(movieId)
            // if movie is present .
            if (index != -1) {
                watchLater = true
            }
        }
        // favourite movie
        const favouriteMovies = await FavouriteMovies.findOne({ email: user.email });
        if (favouriteMovies) {
            const index = favouriteMovies.movieId.indexOf(movieId)
            // if movie is present .
            if (index != -1) {
                favouriteMovie = true
            }
        }
        return res.status(200).json({rating, favouriteMovie, watchLater})


    } catch (err) {
        console.log("error occured : ", err)
    } finally {
        if (db) {
            db.close();
        }
    }
}


module.exports = {
    movieStatus: [verifyToken, movieStatus],
}