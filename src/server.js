require('dotenv').config();
const express = require('express');
const connectDB = require('./infrastructure/database/mongoose');
const statusRouter = require('./interfaces/http/routes/status');

const app = express();

connectDB();

app.use(express.json());

app.use('/', statusRouter);

const productRoutes = require('./interfaces/http/routes/products');
app.use('/products', productRoutes);

require('./infrastructure/jobs/importData');

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
