const cron = require('node-cron');
const ImportDataService = require('../../application/services/importDataService');
const ProductRepository = require('../../domain/repositories/productRepository');
const ProductModel = require('../database/models/productModel');

const productRepository = new ProductRepository(ProductModel);
const importDataService = new ImportDataService(productRepository);

cron.schedule('*/50 * * * *', () => {
  console.log('Importando os dados')
  importDataService.importData(['737628064502']);
  console.log('Importação de dados finalizada.');
});

module.exports = importDataService;
