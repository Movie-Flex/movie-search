const axios = require ('axios');
const MongoClient = require('mongodb').MongoClient;
// const {HfInference}=require( '@huggingface/inference');
const  testVector =require( "../utils/testVector")
const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function getEmbedding(query) {
    try {
        const embedding = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: query,
        encoding_format: "float",
        });
        return embedding.data[0].embedding;
    } catch (error) {
        throw new Error(`Error getting embedding: ${error.message}`);
    }
}



// async function getEmbedding(inputs) {
   
// }


async function findSimilarDocuments(embedding) {
    const url = process.env.MONGODB_URI; 
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db("sample_mflix"); 
        const collection = db.collection('embedded_movies'); 

        const documents = await collection.aggregate([
            {
              "$vectorSearch": {
                "index": "vector_search",
                "path": "plot_embedding",
                "queryVector":embedding,
                "numCandidates": 100,
                "limit": 5
              }
            }
          ]).toArray();

        return documents;
    } finally {
        await client.close();
    }
}

const semanticMovies = async (req, res) => {
    const query = req.query.q;

    try {
        const embedding = await getEmbedding(query);
        const documents = await findSimilarDocuments(embedding);

        // console.log(documents);
        res.status(200).json(documents);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports= { semanticMovies };