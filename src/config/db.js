const mongoose = require('mongoose');

//! .env file configuration
const dotenv = require('dotenv');
dotenv.config();

//! connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;