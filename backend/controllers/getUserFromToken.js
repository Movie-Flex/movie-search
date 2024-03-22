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
        if (!token) {
            return res.status(209).json({message: "Token is required to get user."});
          }
        const tokenToUser = getUser(token);

        // const user = await User_2.findOne({ email: email });

        return res.status(200).json({user : tokenToUser,token : token});

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
