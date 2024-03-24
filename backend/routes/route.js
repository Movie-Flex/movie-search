const express = require('express');
const {loginUser, registerUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const { semanticMovies } = require('../controllers/semanticSearch');
const { availableUser } = require('../controllers/availableUser');
const {addToWatchHistory, getWatchHistory, deleteWatchHistory} = require('../controllers/watchHistory')
const {addFavouriteMovies, getFavouriteMovies, deleteFavouriteMovie} = require('../controllers/favouriteMovies')
const {addWatchLaterMovies, getWatchLaterMovies, deleteWatchLaterMovie} = require('../controllers/watchLater')
const {rateMovie} = require('../controllers/rateMovie')
const {getComments} = require('../controllers/getComments')
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

    // Watch History crud
router.post('/addToWatchHistory/:id',addToWatchHistory)

router.delete('/deleteWatchHistory/:id',deleteWatchHistory)

router.get('/getWatchHistory',getWatchHistory)


    // Favourite Movies crud
router.post('/addFavouriteMovies/:id',addFavouriteMovies)

router.delete('/deleteFavouriteMovie/:id',deleteFavouriteMovie)

router.get('/getFavouriteMovies',getFavouriteMovies)

    // Watch later crud
router.post('/addWatchLaterMovies/:id',addWatchLaterMovies)

router.delete('/deleteWatchLaterMovie/:id',deleteWatchLaterMovie)

router.get('/getWatchLaterMovies',getWatchLaterMovies)

router.get('/getComments/:id', getComments)

// new/update rating
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



const { generateAdminToken} = require("../middlewares/verifyAdmin")
router.post('/generateAdminToken', generateAdminToken)
module.exports = router;