const jwt = require('jsonwebtoken');
const getUser = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return decodedToken;

    } catch (error) {
        console.error('Error decoding token:', error);
        return null; 
    }
};

module.exports = { getUser}