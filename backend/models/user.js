const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    name: String, 
    password: String, 

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Users_2 = mongoose.model('Users_2', userSchema);

module.exports = Users_2;
