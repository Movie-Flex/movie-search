const { connectToDatabase, connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyToken } = require('../middlewares/verifyToken');
const { FavouriteMovies } = require('../models/movies')
const { ObjectId } = require('mongodb');

const dbName = 'sample_mflix';
const collectionName = 'comments';

const getComments = async (req, res) => {
    let client;
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

        const { client: connectedClient, collection: commentCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const allComments = await commentCollection.find(
            { movie_id: new ObjectId (movieId) }
        ).toArray();

        if(allComments.length == 0){
            allComments =[]
            return res.status(200).json({message : "No comments yet! " , comments : allComments});
        }
        return res.status(200).json({ comments : allComments });
        
    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" });

    } finally {
        if (client) {
            client.close();
        }
    }
};

const postComments = async (req, res) => {
    let client;
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        const user = getUser(token)
        const movieId = req.params.id
        const {comment} = req.body

        if (!(movieId)) {
            return res.status(209).json({ message: "Movie id missing." });
        }

        if (!(comment)) {
            return res.status(209).json({ message: "Comments missing." });
        }

        const { client: connectedClient, collection: commentCollection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        // add new comment 
        await commentCollection.insertOne({
            name: user.name,
            email: user.email,
            text: comment,
            movie_id: new ObjectId(movieId),
            date: new Date()
        });

        const allComments = await commentCollection.find(
            { movie_id: new ObjectId (movieId) }
        ).toArray();

        if(allComments.length == 0){
            allComments =[]
            return res.status(200).json({message : "No comments yet! ", comments : allComments });
        }
        return res.status(200).json({message: "successfully added comment.", comments : allComments });

        
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
    getComments: [verifyToken , getComments],
    postComments : [verifyToken, postComments] }