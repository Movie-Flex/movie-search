const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { RatedMovies} = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const mongoURI = process.env.MONGODB_URI;

const rateMovie = async (req, res) => {
    let db;
    let client
    try {

        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        const movieId = req.params.movieId
        const rating = req.params.rating

        const user = getUser(token);

        db = await connectToDatabaseWithSchema(mongoURI)

        const { client: connectedClient, collection: allMovieCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const existingUser = await RatedMovies.findOne({ email: user.email });
        if (existingUser) {  
            const index = existingUser.vote.movieId.indexOf(movieId)
            // if movie is alrady rated.
            if(index != -1){
                const existingRating = existingUser.vote.rating[index]
                existingUser.vote.rating[index] = rating;
                existingUser.lastUpdated = new Date()

                const requiredMovie = await allMovieCollection.findOne({ _id: new ObjectId(movieId) });

                // console.log(requiredMovie)
                const requiredMovieRating = requiredMovie.imdb.rating;
                const requiredMovieVotes = requiredMovie.imdb.votes;
                
                // Model for new rating (average )
                // const updatedVotes = requiredMovieVotes + 1;
                const updatedRating = (requiredMovieRating * requiredMovieVotes + rating - existingRating) / (requiredMovieVotes);
                
                await allMovieCollection.findOneAndUpdate(
                    { _id: new ObjectId(movieId) },
                    { $set: { 'imdb.rating': updatedRating} }
                );


            }else {
                existingUser.vote.movieId.push(movieId);
                existingUser.vote.rating.push(rating);
                existingUser.lastUpdated = new Date()

                const requiredMovie = await allMovieCollection.findOne({ _id: new ObjectId(movieId) });
                const requiredMovieRating = requiredMovie.imdb.rating;
                const requiredMovieVotes = requiredMovie.imdb.votes;

                const updatedVotes = requiredMovieVotes + 1;
                const updatedRating = (requiredMovieRating * requiredMovieVotes + rating) / (updatedVotes);

                await allMovieCollection.updateOne(
                    { _id: new ObjectId(movieId) },
                    { $set: { 'imdb.rating': updatedRating, 'imdb.votes': updatedVotes } }
                );

            }
            await existingUser.save();

            return res.status(200).json({ message: "Successfully updated rating for this movie." });

        } else {
            const newRating = new RatedMovies({
                email: user.email,
                'vote.movieId':[movieId],
                'vote.rating' : [rating],
                lastUpdated: new Date()
            });
            newRating.save();

            const requiredMovie = await allMovieCollection.findOne({ _id: new ObjectId(movieId) });
            const requiredMovieRating = requiredMovie.imdb.rating;
            const requiredMovieVotes = requiredMovie.imdb.votes;

            // new rating model (average)
            const updatedVotes = requiredMovieVotes + 1;
            const updatedRating = (requiredMovieRating * requiredMovieVotes + rating) / (updatedVotes);

            await allMovieCollection.updateOne(
                { _id: new ObjectId(movieId) },
                { $set: { 'imdb.rating': updatedRating, 'imdb.votes': updatedVotes } }
            );
            return res.status(200).json({ message: "Successfully added rating for this movie." });
        }
    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            db.close();
        }
        if(client){
            client.close()
        }
    }
};

module.exports = {
    rateMovie: [verifyToken, rateMovie],
};
