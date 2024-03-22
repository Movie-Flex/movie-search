const { connectToDatabaseWithSchema } = require('../databases/db');
const { getUser } = require('../middlewares/getUserFromToken');
const Role = require('../models/role'); 
const mongoURI = process.env.MONGODB_URI

const isAdmin = async (token) =>{
    let db;
    try{
        db = await connectToDatabaseWithSchema(mongoURI);
        const user = getUser(token);
        if(!user){
            console.log('NO USER FOUND');
            return false;
        }

        const role = await Role.findOne({ email: user.email });
        console.log(role);
        if(role.role=='admin'){
            return true;
        }

        return false;

    }catch (err) {
        console.log("ERROR FINDING USER: ", err);
        return false;
    } finally{
        console.log("[CONNECTION TO  DATABASE ENDED]");
        console.log("[THE DB IS ]", db);
        if(db){
            await db.close();
            console.log("[HEY, IT CLOSED]");
        }
    }
}

module.exports = {isAdmin};