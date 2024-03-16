const jwt = require('jsonwebtoken');
const generateToken = (user, role, subscription) => {
    try {
        const payload = {
            name: user.name,
            email: user.email,
            role: role ? role.role : 'admin', // Use role if found, default to 'admin' otherwise
            subscription: subscription ? subscription.subscription : 'free', // Use subscription type if found, default to 'free' otherwise
            issuedAt: Date.now()
        };

        const options = {
            expiresIn: process.env.EXPIRES_IN || '10m'
        };
        
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        
        return token
    } catch (err) {
        console.error("Error occurred while generating token:", err);
        throw err; 
    }
};


module.exports = { generateToken}