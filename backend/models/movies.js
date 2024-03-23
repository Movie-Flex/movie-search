const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchHistorySchema = new Schema({
    email :{
        type : String,
        unique : true
    },
    movieId :{
        type : [String],
        default : []
    },
    lastUpdated :{
        type : Date,
        default : new Date
    }
});

const watchLaterSchema = new Schema({
    email :{
        type : String,
        unique : true
    },
    movieId :{
        type : [String],
        default : []
    },
    lastUpdated :{
        type : Date,
        default : new Date
    }
});

const favouriteMoviesSchema = new Schema({
    email :{
        type : String,
        unique : true
    },
    movieId :{
        type : [String],
        default : []
    },
    lastUpdated :{
        type : Date,
        default : new Date
    }
});

const ratedMoviesSchema = new Schema({
    email :{
        type : String,
        unique : true
    },
    vote :{
        movieId:{
            type : [String], 
            default : []
        },
        rating :{
            type : [Number],
            default :[]
        }
    },
    lastUpdated :{
        type : Date,
        default : new Date
    }
});

const watchHistory = mongoose.model('watchHistory', watchHistorySchema);
const WatchLater = mongoose.model('WatchLater', watchLaterSchema);
const FavouriteMovies = mongoose.model('FavouriteMovies', favouriteMoviesSchema);
const RatedMovies = mongoose.model('RatedMovies', ratedMoviesSchema); 

module.exports = { watchHistory, WatchLater, FavouriteMovies, RatedMovies };
