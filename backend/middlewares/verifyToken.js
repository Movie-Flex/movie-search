const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  if (!bearer) {
      return res.status(209).json({ error: 'No bearer token' });
  }
  const token = bearer.split(" ")[1];
  if (!token) {
      return res.status(209).json({ message: 'No authentication token found in bearer.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({"Error" : "Invalid or Expired Token. Login again to generate a new token."} );
  }
  return next();
};

module.exports = {verifyToken};