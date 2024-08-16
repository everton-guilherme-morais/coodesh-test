const express = require('express');
const connectDB = require('./infrastructure/database/mongoose');
const statusRouter = require('./interfaces/http/routes/status');
const swaggerSetup = require('./config/swagger');

const app = express();

swaggerSetup(app);

connectDB();

app.use(express.json());

app.use('/', statusRouter);

const productRoutes = require('./interfaces/http/routes/products');
app.use('/products', productRoutes);

require('./infrastructure/jobs/importData');

const PORT = process.env.PORT || 3002;
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
  console.log('Swagger docs available at http://localhost:3002/api-docs');
});
