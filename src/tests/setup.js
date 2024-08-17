const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../infrastructure/database/mongoose');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
