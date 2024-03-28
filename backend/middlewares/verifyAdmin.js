const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateAdminToken = (req, res) => {
    try {
        const {clientEmail, adminEmail, role} = req.body
        const payload = {
            clientEmail : clientEmail,
            adminEmail  : adminEmail,
            role: role ,
            issuedAt: Date.now()
        };

        const options = {
            expiresIn: process.env.EXPIRES_IN || '100m'
        };
        
        const adminToken = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.status(401).json({adminToken} ); 
    } catch (err) {
        console.error("Error occurred while generating admin token:", err);
        throw err; 
    }
};

const verifyAdminToken = (adminToken) => {
  try {
    const decodedAdminToken = jwt.verify(adminToken, process.env.SECRET_KEY);
    return decodedAdminToken

  } catch (err) {
    console.log("error verifying admin token.", err)
    return null;
  }}

module.exports = {generateAdminToken, verifyAdminToken};