const { connectToDatabaseWithSchema } = require('../databases/db');
const User_2 = require('../models/user'); 

const mongoURI = process.env.MONGODB_URI;

const availableUser = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const { email, username } = req.body;

        const existingEmailUser = await User_2.findOne({ email: email });
        const existingUsernameUser = await User_2.findOne({ username: username });

        if (existingUsernameUser) {
            return res.status(204).json({ message: "Username already in use" });
        }else if (existingEmailUser){
            return res.status(204).json({ message: "Email already in use" });
        }
         else {
            return res.status(200).json({ message: "Available" });
        }

    } catch (error) {
        console.error("Error occurred during checking available users:", error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close();
        }
    }
};

module.exports = { availableUser };
