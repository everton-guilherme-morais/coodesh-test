const mongoose = require('mongoose');

const URI = 'mongodb+srv://guilherme20silva99:Everton14galo@coodesh.0cb4g.mongodb.net/food-db?retryWrites=true&w=majority&appName=coodesh';

const mongoURI = process.env.MONGO_URI || URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
