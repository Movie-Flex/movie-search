const express = require('express');
const validateUser = require('../middlewares/validateUser');
const { getMovies } = require('../controllers/autoSuggest');
const { fuzzySearch } = require('../controllers/fuzzySearch');

const router = express.Router();


router.post('/', (req, res) => {
    res.status(200).send("Welcome! Your session is active.");
  });

router.post('/autoSuggest', async (req, res) => {
  try {
    const q = req.query.q;
    const movies = await getMovies(q);

    res.json(movies);
  } catch (err) {
    console.error('Error getting movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/fuzzySearch', async (req, res) => {
  try {
    const q = req.query.q;
    const movies = await fuzzySearch(q);

    res.json(movies);
  } catch (err) {
    console.error('Error getting movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;