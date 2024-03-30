const { connectToDatabaseWithSchema } = require('../databases/db');
const { verifyToken } = require('../middlewares/verifyToken');
const { generateToken } = require('../middlewares/generateToken');
const { getUser } = require('../middlewares/getUserFromToken');
const User_2 = require('../models/user'); 
const Role = require('../models/role'); 
const Subscription = require('../models/subscription');
const PaymentDetails = require('../models/payment'); 

const mongoURI = process.env.MONGODB_URI

const role = async (req, res, db) => {
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }

        const { role: newRole } = req.body;
        
        const tokenTOUser = getUser(token);
        const email = tokenTOUser.email

        const user = await User_2.findOne({ email: email });
        
        const role = await Role.findOne({ email: email });
        
        
        // Update the role if a new role is provided
        if (newRole) {
            await Role.updateOne({ email: email }, { $set: { role: newRole } });

            const subscription = await Subscription.findOne({ email: email });

            const paymentDetail = await PaymentDetails.findOne({ email: email });
            if(paymentDetail){
                const newToken = await generateToken(user, newRole, subscription.subscription,paymentDetail.duration );
            }
            else{
                const newToken = await generateToken(user, newRole, subscription.subscription, "free" );
            }
            
            return res.status(200).json({ message: `Role updated to ${newRole}`, token: newToken });
        }

        return res.status(200).json({ 'role ': role});

    } catch (err) {
        console.error("Error occurred during role update:", err);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        if (db) {
            await db.close();
        }
    }
};

const handleRole = async (req, res) => {
    const db = await connectToDatabaseWithSchema(mongoURI);
    try {
        await role(req, res, db);
    } finally {
        // Close the database connection
        if (db) {
            await db.close();
        }
    }
};

module.exports = {
    role: [verifyToken, handleRole]
};
