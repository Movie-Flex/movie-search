const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'embedded_movies';
const {ObjectId} = require('mongodb');

const movies = async (req, res) => {
    let client;
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(404).json({ message: "No bearer token" });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "No token in the bearer" });
        }

        const { toSearch } = req.body;
        if (!toSearch || toSearch.length == 0) {
            res.status(400).json({ message: "No genre specificed" })
            //TODO: HAVE TO MOVIES WITH ALL THE GENRES FOR THIS
        }

        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        // Create the aggregation pipeline with the $search stage
        const pipeline = [
            {
                $search: {
                    index: 'default',
                    text: {
                        query: toSearch,
                        path: "genres",
                    }
                }
            },
            {
                $limit: 10
            },
            // {
            //     $project: {
            //         _id: 0,
            //         title: 1,
            //         poster: 1,
            //         imdb: 1,
            //         year: 1,
            //         genres: 1
            //     },
            // },
        ];

        const movies = await collection.aggregate(pipeline).toArray();
        console.log(movies);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: JSON.stringify(err) });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

const oneMovie = async (req, res) => {
    let client;
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(404).json({ message: "No bearer token" });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "No token in the bearer" });
        }

        const {id} = req.body;
        if(!id){
            return res.status(400).json({message: "No id found"});
        }

        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName);
        client = connectedClient;

        const result = await collection.findOne({"_id": new ObjectId(id)});
        if(!result){
            return res.status(400).json({message:"No movie found with the provided id"});
        }
        return res.status(200).json(result);

    } catch (err) {
        res.status(500).json({message: "Internal server error"});
    } finally {
        if(client){
            await client.close();
        }
    }
}

module.exports = {movies, oneMovie};