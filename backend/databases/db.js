const mongoose = require("mongoose");

const connect_M_DB = async (db_url) => {
    try {
        await mongoose.connect(db_url, {
        });
        console.log(`Connected to MongoDB successfully`);
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = { connect_M_DB };
