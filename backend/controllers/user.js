const { connectToDatabase } = require('../databases/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../middlewares/generateToken')
const Role = require('../models/role'); 
const Subscription = require('../models/subscription');

const dbName = 'sample_mflix';


const registerUser = async (req, res) => {
    let client;
    try {
        const { username, email, name, password } = req.body;

        if (!(email && name && username && password)) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        
        const { client: connectedClient, collection: userCollection } = await connectToDatabase(dbName, 'users_2');
        client = connectedClient;

        const existingUser = await userCollection.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {
            return res.status(409).json({ Info: "User already exists" });
        }

        

        const { collection: roleCollection } = await connectToDatabase(dbName, 'roles');

        const { collection: subscriptionCollection } = await connectToDatabase(dbName, 'subscriptions');

        await roleCollection.insertOne({ email: email, role: 'admin', createdAt : Date() });

        await subscriptionCollection.insertOne({ email: email, subscription: 'free',createdAt : Date() });

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email: email.toLowerCase(),
            username: username,
            name: name,
            password: encryptedPassword,
            createdAt : Date()
        };

        await userCollection.insertOne(newUser);

        const token = await generateToken(newUser);

        return res.status(200).json({ message: "Account created successfully", token });

    } catch (err) {
        console.error("Error occurred while creating new user:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            await client.close();
        }
    }
};


const loginUser = async (req, res) => {
    let client; 
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        const { client: connectedClient, collection: userCollection } = await connectToDatabase(dbName, 'users_2');
        client = connectedClient;


        const { collection: roleCollection } = await connectToDatabase(dbName, 'roles');

        const { collection: subscriptionCollection } = await connectToDatabase(dbName, 'subscriptions');

        const user = await userCollection.findOne({ email: email });

        if (user && await bcrypt.compare(password, user.password)) {

            const role = await roleCollection.findOne({ email: email });
            const subscription = await subscriptionCollection.findOne({ email: email });

            const token = await generateToken(user, role, subscription);
            console.log(role, subscription)
            
            return res.status(200).json({ token: token });
        }

        return res.status(400).json({ error: "Invalid credentials" });

    } catch (err) {
        console.log("Error occurred during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            await client.close();
        }
    }
};

// const loginUser = async (req, res) => {
//     let client; 
//     try {
//         const { email, password } = req.body;
//         if (!(email && password)) {
//             return res.status(400).json({ error: "Email and password are required!" });
//         }

//         const { client: connectedClient, collection: userCollection } = await connectToDatabase(dbName, 'users_2');
//         client = connectedClient;

//         const user = await userCollection.findOne({ email: email });

//         if (user && await bcrypt.compare(password, user.password)) {
//             // Fetch role and subscription details using Mongoose models
//             const role = await Role.findOne({ email: email });
//             const subscription = await Subscription.findOne({ email: email });

//             // Generate token with user, role, and subscription data
//             const token = await generateToken(user, role, subscription);
            
//             return res.status(200).json({ token: token });
//         }

//         return res.status(400).json({ error: "Invalid credentials" });

//     } catch (err) {
//         console.log("Error occurred during login:", err);
//         return res.status(500).json({ error: "Internal server error" });
//     } finally {
//         if (client) {
//             await client.close();
//         }
//     }
// };



module.exports = {loginUser, registerUser };
