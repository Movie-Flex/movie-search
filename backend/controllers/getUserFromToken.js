const { connectToDatabaseWithSchema } = require('../databases/db');
const { verifyToken } = require('../middlewares/verifyToken');
const { getUser } = require('../middlewares/getUserFromToken');
const User_2 = require('../models/user');

const mongoURI = process.env.MONGODB_URI;

const getUserFromToken = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const { token } = req.body;
        const tokenToUser = getUser(token);

        return res.status(200).json({ user: tokenToUser });

    } catch (err) {
        console.error("Error occurred during fetching user.", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close();
        }
    }
};

module.exports = {
    getUserFromToken: [verifyToken, getUserFromToken]
};
