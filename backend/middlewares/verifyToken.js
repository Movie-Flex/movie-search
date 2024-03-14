const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["token"]
  if (!token) {
    return res.status(403).send("Token is required for authentication in header with key = token");
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