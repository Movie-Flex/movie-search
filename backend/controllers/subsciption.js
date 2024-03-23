const { connectToDatabaseWithSchema } = require('../databases/db');
const { verifyToken } = require('../middlewares/verifyToken');
const { generateToken } = require('../middlewares/generateToken');
const { getUser } = require('../middlewares/getUserFromToken');
const User_2 = require('../models/user'); 
const Role = require('../models/role'); 
const Subscription = require('../models/subscription'); 

const mongoURI = process.env.MONGODB_URI;

const subscription = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }

        const { subscription: newSubscription } = req.body;
        const tokenToUser = getUser(token);
        const email = tokenToUser.email;

        const user = await User_2.findOne({ email: email });
        const userSubscription = await Subscription.findOne({ email: email });

        // Update the subscription if a new subscription is provided
        if (newSubscription) {
            await Subscription.updateOne({ email: email }, { $set: { subscription: newSubscription } });

            const role = await Role.findOne({ email: email });

            const newToken = await generateToken(user, role.role, newSubscription);
            return res.status(200).json({ message: `Subscription updated to ${newSubscription}`, token: newToken });
        }

        return res.status(200).json({ subscription: userSubscription });

    } catch (err) {
        console.error("Error occurred during subscription update:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close(); 
        }
    }
};

module.exports = {
    subscription: [verifyToken, subscription]
};
