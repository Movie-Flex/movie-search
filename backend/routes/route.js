const express = require('express');
const {loginUser, registerUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const { semanticMovies } = require('../controllers/semanticSearch');
const { availableUser } = require('../controllers/availableUser');
const {addToWatchHistory, getWatchHistory} = require('../controllers/watchHistory')
const {addFavouriteMovies, getFavouriteMovies} = require('../controllers/favouriteMovies')
const {addWatchLaterMovies, getWatchLaterMovies} = require('../controllers/watchLater')
const {rateMovie} = require('../controllers/rateMovie')
const role = require('../controllers/role');
const subscription = require('../controllers/subsciption');
const payment= require('../controllers/payment');
const getUserFromToken = require('../controllers/getUserFromToken');
const {addMovie, deleteMovie, updateMovie} = require('../controllers/admin');


const router = express.Router();


// account related api's
router.get('/availableUser', availableUser);

router.post('/login',loginUser);

router.post('/signup',registerUser);

router.post('/role', role.role);

router.post('/getUser', getUserFromToken.getUserFromToken);

router.post('/subscription', subscription.subscription);


// search related api's
router.post('/autoSuggest', getMovies)

router.post('/fuzzySearch', fuzzySearch)

router.post('/semantic', semanticMovies)


// user action related api's
router.post('/addToWatchHistory/:id',addToWatchHistory)

router.get('/getWatchHistory',getWatchHistory)

router.post('/addFavouriteMovies/:id',addFavouriteMovies)

router.get('/getFavouriteMovies',getFavouriteMovies)

router.post('/addWatchLaterMovies/:id',addWatchLaterMovies)

router.get('/getWatchLaterMovies',getWatchLaterMovies)

router.post('/rateMovie/:movieId/:rating', rateMovie)


// admin action related api's
router.post('/add-movie', addMovie);

router.delete('/delete-movie/:id', deleteMovie);

router.post('/update-movie/:id', updateMovie);


// payment related api's
router.post('/dashboard', payment.dashboard)

router.post('/order', payment.order)

router.post('/verify', payment.verify)

router.post('/cancel', payment.refund)


module.exports = router;