const { verifyToken } = require('../middlewares/verifyToken');


const welcome = (req, res) => {

    res.status(200).send("Welcome! Your session is active.");
};

module.exports = {
    welcome: [verifyToken, welcome]
};
