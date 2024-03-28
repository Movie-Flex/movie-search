const jwt = require("jsonwebtoken");
require("dotenv").config();
const { isAdmin } = require('./admin');

const generateAdminToken = async (req, res) => {
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      return res.status(404).json({ error: 'No authentication token' });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(404).json({ error: 'No authentication token found' });
    }
    //console.log(token);
    let role_check = false;
    //console.log(role);
    role_check = await isAdmin(token);
    //console.log(role);
    if (!role_check) {
      return res.status(400).json({ error: 'You dont have permission to perform this operation' });
    }
    const { clientEmail, adminEmail, role } = req.body
    const payload = {
      clientEmail: clientEmail,
      adminEmail: adminEmail,
      role: role,
      issuedAt: Date.now()
    };

    const options = {
      expiresIn: process.env.EXPIRES_IN || '100m'
    };

    const adminToken = jwt.sign(payload, process.env.SECRET_KEY, options);
    return res.status(200).json({ adminToken });
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
  }
}

module.exports = { generateAdminToken, verifyAdminToken };