require('dotenv').config();
const mongoose = require('mongoose');
// URI calling using .env 
const mongoURI = process.env.MONGO_URI;

console.log(mongoURI);
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
}

module.exports = connectToMongo;
