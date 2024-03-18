const express = require('express');
const {loginUser, registerUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const role = require('../controllers/role');
const subscription = require('../controllers/subsciption');
const authTest = require('../controllers/authTest');
const { semanticMovies } = require('../controllers/semanticSearch');
const { availableUser } = require('../controllers/availableUser');
const payment= require('../controllers/payment');
const getUserFromToken = require('../controllers/getUserFromToken');
// const {checkout, verifyPayment, dashboard} = require('../controllers/paymentRender');



const router = express.Router();

router.post('/login',loginUser);

router.post('/signup',registerUser);

router.get('/authTest', authTest.welcome);

router.post('/role', role.role);

router.post('/getUser', getUserFromToken.getUserFromToken);

router.get('/availableUser', availableUser);

router.post('/subscription', subscription.subscription);

router.post('/autoSuggest', getMovies)

router.post('/fuzzySearch', fuzzySearch)

router.post('/semantic', semanticMovies)

// payment router (token is required for verification)
router.post('/dashboard', payment.dashboard)
router.post('/order', payment.order)
router.post('/verify', payment.verify)


module.exports = router;