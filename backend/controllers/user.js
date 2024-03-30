const { connectToDatabaseWithSchema } = require('../databases/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/generateToken');
const { readKeys, encryptPassword, decryptPassword } = require('../middlewares/encrypt');

const User_2 = require('../models/user');
const Role = require('../models/role');
const Subscription = require('../models/subscription');
const PaymentDetail = require('../models/payment');
const { getUser } = require('../middlewares/getUserFromToken');
const { verifyAdminToken } = require('../middlewares/verifyAdmin');
const { verifyToken } = require('../middlewares/verifyToken');
const PaymentDetails = require('../models/payment'); 

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
        // if (req.body.role) {
        //     role = req.body.role
        // }
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
        const token = generateToken(newUser, newRole.role, newSubscription.subscription);
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

        const { userId, password , adminToken} = req.body;
        if (!(userId && password )) {
            return res.status(209).json({ message: "Email/username and password are required!" });
        }


        const user = await User_2.findOne({ $or: [{ email:userId }, { username:userId }] });

        if (!user) {
            return res.status(209).json({ message: "User not found" });
        }

        // const passwordMatch = await bcrypt.compare(decryptedPassword, password);

        const { privateKey, publicKey } = await readKeys();
        // const encryptedPassword = encryptPassword(password, publicKey);
        const decryptedPassword = decryptPassword(user.password, privateKey);

        if (decryptedPassword == password) {

            // checking if subscription of user expired or not
            const paymentDetail = await PaymentDetail.findOne({ email: user.email }).sort({ updatedDate: -1 });
            if (paymentDetail) {
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
                
            let role = await Role.findOne({ email: user.email });


            let newAdminObject = verifyAdminToken(adminToken)

            if(newAdminObject){
                
                const clientEmail  = newAdminObject.clientEmail
                const adminEmail = newAdminObject.adminEmail
                let newRole = newAdminObject.role
                const veriyExistingAdminRole = await Role.findOne({email: adminEmail})
                if(veriyExistingAdminRole.role != "admin"){  // token generated by unknown person
                    return res.status(209).json({message : "Token genearted by unauthorized person"})
                } else if(clientEmail != user.email){
                    return res.status(209).json({message : "Email didn't matched with the concerned person's email"})
                }else{ // make him admin
                    await Role.findOneAndUpdate({email : clientEmail},{role : newRole});
                }

            }

            role = await Role.findOne({ email: user.email });
            let token;
            const subscription = await Subscription.findOne({ email: user.email });
            if(paymentDetail){
                 token = await generateToken(user, role.role, subscription.subscription,paymentDetail.duration );
            }else{
                 token = await generateToken(user, role.role, subscription.subscription, "free");
            }
            // const token = generateToken(user, role.role, subscription.subscription);
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

const userProfile = async (req, res) =>{
    let db;
    try{

        db = await connectToDatabaseWithSchema(mongoURI);
        const bearer = req.headers['authorization'];
        if(!bearer){
            res.status(209).json({message : "Authorization bearer missing in headers."})
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        const updateDetails = req.body;
        const user = getUser(token); 
        
        if(updateDetails){
            const userDetails = await User_2.findOneAndUpdate({email : user.email},{
                gender : updateDetails.gender,
                phone : updateDetails.phone,
                dob : updateDetails.dob,
                address : updateDetails.address
            })
            return res.status(200).json({message : "Successfully updated profile.",userDetails});
        }else{
            const userDetails = await User_2.findOne({email : user.email});
            return res.status(200).json({userDetails});
        }

    }catch(err){
        console.log("ERROR FETCHING USER DETAILS :" , err)
        res.status(500).json("Internal server error.")
    }finally{
        if(db){
            db.close()
        }
    }
}

const updateProfile = async (req, res) =>{
    let db;
    try{

        db = await connectToDatabaseWithSchema(mongoURI);
        const bearer = req.headers['authorization'];
        if(!bearer){
            res.status(209).json({message : "Authorization bearer missing in headers."})
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        const updateDetails = req.body;
        const user = getUser(token); 
        
        if(updateDetails){
            const userDetails = await User_2.findOneAndUpdate({email : user.email},{
                gender : updateDetails.gender,
                phone : updateDetails.phone,
                dob : updateDetails.dob,
                address : updateDetails.address
            })
            return res.status(200).json({message : "Successfully updated profile.",userDetails});
        }else{
            const userDetails = await User_2.findOne({email : user.email});
            return res.status(200).json({userDetails});
        }

    }catch(err){
        console.log("ERROR FETCHING USER DETAILS :" , err)
        res.status(500).json("Internal server error.")
    }finally{
        if(db){
            db.close()
        }
    }
}
module.exports = { registerUser, loginUser, 
    userProfile :[verifyToken, userProfile] , 
    updateProfile :[verifyToken, updateProfile] };
