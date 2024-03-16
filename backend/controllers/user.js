const { connectToDatabaseWithSchema } = require('../databases/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/generateToken');
const { readKeys, encryptPassword, decryptPassword } = require('../middlewares/encrypt');

const User_2 = require('../models/user'); 
const Role = require('../models/role'); 
const Subscription = require('../models/subscription'); 

const mongoURI = process.env.MONGODB_URI;

const registerUser = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const { username, email, name, password } = req.body;

        if (!(email && name && username && password)) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const existingUser = await User_2.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {

            return res.status(409).json({ Info: "User already exists" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10); // change this to rsa encryption

        // encryption using RSA public-key cryptography
        const { privateKey, publicKey } = await readKeys();
        const encryptedPassword = encryptPassword(password, publicKey);

        const newUser = new User_2({
            email: email.toLowerCase(),
            username: username,
            name: name,
            password: encryptedPassword,
        });

        await newUser.save();

        const newRole = new Role({
            email: email,
            role: req.body.role ? req.body.role : 'standard_user'
        });
        await newRole.save();

        const newSubscription = new Subscription({
            email: email,
            subscription: 'free',
        });
        await newSubscription.save();

        const token = generateToken(newUser, "role", "free");

        return res.status(200).json({ message: "Account created successfully", token });

    } catch (error) {
        console.error("Error occurred while creating new user:", error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close();
        }
    }
};

const loginUser = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        const user = await User_2.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // const passwordMatch = await bcrypt.compare(decryptedPassword, password);

        const { privateKey, publicKey } = await readKeys();
        // const encryptedPassword = encryptPassword(password, publicKey);
        const decryptedPassword = decryptPassword(user.password, privateKey);

        if (decryptedPassword == password) {
            const role = await Role.findOne({ email: email });
            const subscription = await Subscription.findOne({ email: email });
            const token = generateToken(user, role, subscription);
            return res.status(200).json({ token });
        }

        return res.status(400).json({ error: "Invalid credentials" });

    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close();
        }
    }
};


module.exports = { registerUser, loginUser };
