const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const {token} = req.body
  if (!token) {
    return res.status(403).json({"Error": "Token is required for authentication in body"});
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