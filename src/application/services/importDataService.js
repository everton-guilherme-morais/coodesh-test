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
        // console.log(`Buscando dados do produto com código de barras: ${barcode}`);

        try {
          const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
          console.log(response, 'response')
          if (response.data && response.data.product) {
            const productData = response.data.product;
            // console.log(`Produto encontrado: ${productData.product_name}`);

            // Removendo o campo _id, se existir
            delete productData._id;

            // Verifica se o produto já existe no banco de dados
            const existingProduct = await this.productRepository.findByCode(productData.code);

            if (existingProduct) {
              // Atualiza o produto existente
              await this.productRepository.update(productData.code, {
                ...productData,
                imported_t: new Date(),
                status: 'draft',
              });
            } else {
              // Cria um novo produto
              await this.productRepository.create({
                ...productData,
                imported_t: new Date(),
                status: 'draft',
              });
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
