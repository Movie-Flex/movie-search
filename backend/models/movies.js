const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentMoviesSchema = new Schema({
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

const RecentMovies = mongoose.model('RecentMovies', recentMoviesSchema);
const WatchLater = mongoose.model('WatchLater', watchLaterSchema);
const FavouriteMovies = mongoose.model('FavouriteMovies', favouriteMoviesSchema);
const RatedMovies = mongoose.model('RatedMovies', ratedMoviesSchema); 

module.exports = { RecentMovies, WatchLater, FavouriteMovies, RatedMovies };
