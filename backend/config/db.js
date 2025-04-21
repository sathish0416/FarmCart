const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require('dotenv')


dotenv.config();
console.log(process.env.MONGO_URI);
console.log(process.env.GOOGLE_MAPS_API_KEY);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection successful");
    } catch (e) {
        console.error("MongoDB connection failed:", e);
        process.exit(1);
    }

};
module.exports = connectDB;