const jwt = require('jsonwebtoken');
const generateToken = (user, role, subscription, duration) => {
    try {
        const payload = {
            name: user.name,
            email: user.email,
            username : user.username,
            role: role ,
            subscription: subscription ,
            createdAt : user.createdAt,
            duration : duration,
            issuedAt: Date.now()
        };

        const options = {
            expiresIn: process.env.EXPIRES_IN || '100m'
        };
        
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        
        return token
    } catch (err) {
        console.error("Error occurred while generating token:", err);
        throw err; 
    }
};


module.exports = { generateToken}