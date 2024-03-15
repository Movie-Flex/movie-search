const { verifyToken } = require('../middlewares/verifyToken');


const welcome = (req, res) => {

    res.status(200).json({
        status: "Login Successful",
        message: "Welcome! Your session is active."}
    );
};

module.exports = {
    welcome: [verifyToken, welcome]
};
