const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminMoviesSchema = new Schema({
    plot: {
        type: String,
        
    },
    genres: {
        type: String,
        array: ['short', 'western'],
        default: 'western'
    }, 
    runtime: {
        type: Number,
    },
    cast: {
        type: String,
    },
    poster:{
        type: String,
    },
    title: {
        type: String,
    },
    fullplot: {
        type: String,
    },
    languages: {
        type: String,
    },
    released: {
        type: Date,
    },
    directors: {
        type: String,
    },
    rated: {
        type: String,
    },
    awards: {
        type: String,
    },
    lastupdated: {
        type: String,
    },
    year: {
        type: Number,
    },
    imdb:{
        type: Object,
    },
    countries:{
        type: String,
    },
    type:{
        type: String,
    },
    tomatoes:{
        type: Object,
    },
    num_mflix_comments:{
        type: Number
    },
});

const adminMovies = mongoose.model('Roles', adminMoviesSchema);

module.exports = adminMovies;
