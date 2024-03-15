const { connectToDatabase } = require('../databases/db');
const { verifyToken } = require('../middlewares/verifyToken');
const { generateToken } = require('../middlewares/generateToken');
const { getUser } = require('../middlewares/getUserFromToken');

const dbName = 'sample_mflix';

const subscription = async (req, res) => {
    let client; 
    try {
        const { subscription: newSubscription, token } = req.body;
        const tokenTOUser = getUser(token);
        const email = tokenTOUser.email

        const { client: connectedClient, collection: userCollection } = await connectToDatabase(dbName, 'users_2');
        client = connectedClient;

        const { collection: roleCollection } = await connectToDatabase(dbName, 'roles');
        const { collection: subscriptionCollection } = await connectToDatabase(dbName, 'subscriptions');

        const user = await userCollection.findOne({ email: email });
        
        
        // Update the role if a new role is provided
        if (newSubscription) {
            await subscriptionCollection.updateOne({ email: email }, { $set: { subscription: newSubscription } });

            const role = await roleCollection.findOne({ email: email });

            const newToken = await generateToken(user, role, newSubscription);

            return res.status(200).json({ info: `Subscription updated to ${newSubscription}`, token: newToken });
        }
        const subscription = await subscriptionCollection.findOne({ email: email });

        return res.status(200).json({ 'subscription ': subscription});

    } catch (err) {
        console.error("Error occurred during subscription update:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = {
    subscription: [verifyToken, subscription]
};
