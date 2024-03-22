const express = require('express');
const {loginUser, registerUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const { semanticMovies } = require('../controllers/semanticSearch');
const { availableUser } = require('../controllers/availableUser');
const {addRecentMovies, getRecentMovies} = require('../controllers/recentMovies')
const {addFavouriteMovies, getFavouriteMovies} = require('../controllers/favouriteMovies')
const {addWatchLaterMovies, getWatchLaterMovies} = require('../controllers/watchLater')
const role = require('../controllers/role');
const subscription = require('../controllers/subsciption');
const payment= require('../controllers/payment');
const getUserFromToken = require('../controllers/getUserFromToken');


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

router.post('/addRecentMovies',addRecentMovies)

router.get('/getRecentMovies',getRecentMovies)

router.post('/addFavouriteMovies',addFavouriteMovies)

router.get('/getFavouriteMovies',getFavouriteMovies)

router.post('/addWatchLaterMovies',addWatchLaterMovies)

router.get('/getWatchLaterMovies',getWatchLaterMovies)

router.post('/dashboard', payment.dashboard)

router.post('/order', payment.order)

router.post('/verify', payment.verify)

router.post('/cancel', payment.refund)


module.exports = router;