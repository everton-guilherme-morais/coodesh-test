const mongoose = require('mongoose');

const mongoURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTE : process.env.MONGO_URI_PROD;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
