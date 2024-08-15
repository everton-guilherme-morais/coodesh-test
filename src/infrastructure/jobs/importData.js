const cron = require('node-cron');
const axios = require('axios');
const ImportDataService = require('../../application/services/importDataService');
const ProductRepository = require('../../domain/repositories/productRepository');
const ProductModel = require('../database/models/productModel');
const CronService = require('./cronService');

const productRepository = new ProductRepository(ProductModel);
const importDataService = new ImportDataService(productRepository);
const cronService = new CronService();

cron.schedule('*/1 * * * *', async () => {
  try {
    const response = await axios.get('https://world.openfoodfacts.org/api/v2/search.json?fields=code&page_size=100');

    if (response.data && response.data.products) {
      const barcodes = response.data.products.map(product => product.code);
      
      if (barcodes.length > 0) {
        await importDataService.importData(barcodes);
      } else {
        console.log('Nenhum código');
      }
    } else {
      console.log('Nenhum dado retornado da API.');
    }
  } catch (error) {
    console.error('Erro ao buscar códigos:', error.message);
  }
  cronService.updateExecutionTime();
});

console.log('CronService instance in importData:', cronService);
module.exports = { importDataService, cronService };
