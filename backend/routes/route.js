const express = require('express');
const {loginUser, registerUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const role = require('../controllers/role');
const subscription = require('../controllers/subsciption');
const { semanticMovies } = require('../controllers/semanticSearch');
const { availableUser } = require('../controllers/availableUser');
const payment= require('../controllers/payment');
const getUserFromToken = require('../controllers/getUserFromToken');
const {orderTest, verifyTest, dashboardTest} = require('../controllers/paymentRender');  //testing
const {addRecentMovies, getRecentMovies} = require('../controllers/recentMovies')


const router = express.Router();

router.get('/availableUser', availableUser);

router.post('/login',loginUser);

router.post('/signup',registerUser);

router.post('/role', role.role);

router.post('/getUser', getUserFromToken.getUserFromToken);

router.post('/subscription', subscription.subscription);

router.post('/autoSuggest', getMovies)

router.post('/fuzzySearch', fuzzySearch)

router.post('/semantic', semanticMovies)

// payment routers (token is required for verification)
router.post('/dashboard', payment.dashboard)

router.post('/order', payment.order)

router.post('/verify', payment.verify)

router.post('/refund', payment.refund)

router.post('/addRecentMovies',addRecentMovies)

router.get('/getRecentMovies',getRecentMovies)




// testing payment 
router.get('/dashboard', dashboardTest)
router.get('/order', orderTest)
router.get('/verify', verifyTest)


module.exports = router;