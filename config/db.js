const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectdb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL || "mongodb://localhost:27017/docapp"
        if (!mongoUri) {
            throw new Error('MONGODB_URL s not defined');
        }
        console.log(`Attempting to connect to MongoDB at: ${mongoUri}`);
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Add this line if using MongoDB < 5.0
        });
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};


module.exports = connectdb;
