require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../databases/db');

const dbName = 'sample_mflix';
const collectionName = 'users';

const generateToken = async (user) => {
    const payload = {
        name : user.name,
        email: user.emailId,
        issuedAt: user.currentTime
    };
    const options = {
        expiresIn: process.env.EXPIRES_IN
    };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
};

const loginUser = async (req, res) => {
    let client; 
    try {
        const { email, password } = req.headers;
        if (!(email && password)) {
            return res.status(400).send("Email and password are required!");
        }

        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient; // Assign client

        const user = await collection.findOne({ email: email });

        // if (user && await bcrypt.compare(password, user.password)) {
        if (user && (password == user.password)) {
            const token = await generateToken(user);
            return res.status(200).json({ token: token });
        }

        return res.status(400).json("Invalid credentials");

    } catch (err) {
        console.log("Error occurred during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = { loginUser };
