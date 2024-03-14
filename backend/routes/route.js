const express = require('express');
const {loginUser} = require('../controllers/user');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');
const authTest = require('../controllers/authTest');

const router = express.Router();

router.get('/login',loginUser);

router.get('/authTest', authTest.welcome);

router.post('/autoSuggest', getMovies)

router.post('/fuzzySearch', fuzzySearch)




module.exports = router;