const { connectToDatabaseWithSchema } = require('../databases/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/generateToken');
const { readKeys, encryptPassword, decryptPassword } = require('../middlewares/encrypt');

const User_2 = require('../models/user');
const Role = require('../models/role');
const Subscription = require('../models/subscription');
const PaymentDetail = require('../models/payment');
const { getUser } = require('../middlewares/getUserFromToken');

const mongoURI = process.env.MONGODB_URI;

const registerUser = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const { username, email, name, password } = req.body;

        if (!(email && name && username && password)) {
            return res.status(209).json({ message: "All fields are required!" });
        }

        const existingUser = await User_2.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {

            return res.status(209).json({ message: "User already exists" });
        }
        let role = "standard_user"
        if (req.body.role) {
            role = req.body.role
        }
        const subscription = "free"
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
            role: role
        });
        await newRole.save();

        const newSubscription = new Subscription({
            email: email,
            subscription: subscription,
        });
        await newSubscription.save();

        const token = generateToken(newUser, role, subscription);

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

        const { email, password, username } = req.body;
        if (!(email && password || username && password)) {
            return res.status(209).json({ message: "Email and password are required!" });
        }


        const user = await User_2.findOne({ $or: [{ email: email }, { username: username }] });

        if (!user) {
            return res.status(209).json({ message: "User not found" });
        }

        // const passwordMatch = await bcrypt.compare(decryptedPassword, password);

        const { privateKey, publicKey } = await readKeys();
        // const encryptedPassword = encryptPassword(password, publicKey);
        const decryptedPassword = decryptPassword(user.password, privateKey);

        if (decryptedPassword == password) {

            // checking if subscription of user expired or not
            const paymentDetail = await PaymentDetail.findOne({ email: user.email });
            if (paymentDetail) {
                console.log(paymentDetail)
                const paymentDate = paymentDetail.paymentDate
                const millisecondsUsed = new Date() - paymentDate;
                const daysUsed = Math.floor(millisecondsUsed / (1000 * 60 * 60 * 24));
                const duration = paymentDetail.duration

                const daysInMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth() + 1, 0).getDate();
                const daysInYear = (paymentDate.getFullYear()) % 4 == 0 ? 366 : 365;

                if ((duration == 'feeMonthly' && daysUsed > daysInMonth || duration == 'feeYearly' && daysUsed > daysInYear)) {
                    await Subscription.findOneAndUpdate({ email: user.email }, { $set: { subscription: "free" } });
                    await PaymentDetail.findOneAndUpdate({ email: user.email }, { $set: { status: "inactive" } });
                }
            }


            const role = await Role.findOne({ email: email });
            const subscription = await Subscription.findOne({ email: email });
            const token = generateToken(user, role, subscription);
            return res.status(200).json({ token });
        }

        return res.status(209).json({ message: "Invalid credentials" });

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
