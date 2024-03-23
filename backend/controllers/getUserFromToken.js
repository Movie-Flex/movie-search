const { connectToDatabaseWithSchema } = require('../databases/db');
const { verifyToken } = require('../middlewares/verifyToken');
const { getUser } = require('../middlewares/getUserFromToken');

const mongoURI = process.env.MONGODB_URI;

const getUserFromToken = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const bearer = req.headers['Authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No authentication token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found' });
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
