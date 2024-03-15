const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'standard_user'],
        default: 'admin'
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Roles = mongoose.model('Roles', roleSchema);

module.exports = Roles;
