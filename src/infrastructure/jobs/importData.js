const cron = require('node-cron');
const axios = require('axios');
const ImportDataService = require('../../application/services/importDataService');
const ProductRepository = require('../../domain/repositories/productRepository');
const ProductModel = require('../database/models/productModel');

const productRepository = new ProductRepository(ProductModel);
const importDataService = new ImportDataService(productRepository);

cron.schedule('*/10 * * * *', async () => {
  console.log('Importando os dados');

  try {
    const response = await axios.get('https://world.openfoodfacts.org/api/v2/search.json?fields=code&page_size=100');

    if (response.data && response.data.products) {
      const barcodes = response.data.products.map(product => product.code);
      
      if (barcodes.length > 0) {
        await importDataService.importData(barcodes);
        console.log('Importação de dados finalizada.');
      } else {
        console.log('Nenhum código');
      }
    } else {
      console.log('Nenhum dado retornado da API.');
    }
  } catch (error) {
    console.error('Erro ao buscar códigos:', error.message);
  }
});

module.exports = importDataService;
