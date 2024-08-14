const axios = require('axios');
const ImportHistoryModel = require('../../infrastructure/database/models/importHistoryModel');

class ImportDataService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async importData(barcodes) {
    try {
      console.log('Iniciando a importação de dados...');
      const limit = 10;

      for (let i = 0; i < barcodes.length && i < limit; i++) {
        const barcode = barcodes[i];

        try {
          const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
          if (response.data && response.data.product) {
            const productData = response.data.product;

            const filteredData = {
              code: productData.code,
              status: 'draft',
              imported_t: new Date(),
              url: productData.url,
              creator: productData.creator,
              created_t: productData.created_t,
              last_modified_t: productData.last_modified_t,
              product_name: productData.product_name,
              quantity: productData.quantity,
              brands: productData.brands,
              categories: productData.categories,
              labels: productData.labels,
              cities: productData.cities,
              purchase_places: productData.purchase_places,
              stores: productData.stores,
              ingredients_text: productData.ingredients_text,
              traces: productData.traces,
              serving_size: productData.serving_size,
              serving_quantity: productData.serving_quantity,
              nutriscore_score: productData.nutriscore_score,
              nutriscore_grade: productData.nutriscore_grade,
              main_category: productData.main_category,
              image_url: productData.image_url
            };

            const existingProduct = await this.productRepository.findByCode(filteredData.code);

            if (existingProduct) {
              await this.productRepository.update(filteredData.code, filteredData);
            } else {
              await this.productRepository.create(filteredData);
            }
          } else {
            console.log(`Produto não encontrado para o código de barras: ${barcode}`);
          }
        } catch (error) {
          console.error(`Erro ao buscar o produto com código de barras ${barcode}:`, error.message);
        }
      }

      console.log('Importação de dados finalizada.');
    } catch (error) {
      console.error('Erro ao importar dados:', error.message);
      await ImportHistoryModel.create({
        file: 'unknown',
        status: 'failure',
      });
    }
  }
}

module.exports = ImportDataService;
