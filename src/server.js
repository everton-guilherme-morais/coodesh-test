const express = require('express');
const connectDB = require('./infrastructure/database/mongoose');

const app = express();

connectDB();

app.use(express.json());

const productRoutes = require('./interfaces/http/routes/products');
app.use('/products', productRoutes);

require('./infrastructure/jobs/importData');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
