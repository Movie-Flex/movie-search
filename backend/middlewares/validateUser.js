const axios = require('axios');

const validateUser = async (req, res, next) => {
    const accessToken = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!accessToken) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    try {
        // Make API call to verify token
        const response = await axios.post('http://localhost:3001/api/validateUser', null, {
         headers: {
            "x-access-token": accessToken
        }
        });

        // If token is valid, proceed to the next middleware
        if (response.data.message) {
            next();
        } else {
            throw new Error('No proper response.');
        }
    } catch (error) {

        return res.status(401).json({ error: 'Invalid access token' , error});
    }
};

module.exports = validateUser;
