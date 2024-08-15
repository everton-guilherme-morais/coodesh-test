class ProductService {
  constructor(createProduct, updateProduct, deleteProduct, getProduct, getAllProducts) {
    this.createProductUseCase = createProduct;
    this.updateProductUseCase = updateProduct;
    this.deleteProductUseCase = deleteProduct;
    this.getProductUseCase = getProduct;
    this.getAllProductsUseCase = getAllProducts;
  }

  async createProduct(productData) {
    return await this.createProductUseCase.execute(productData);
  }

  async updateProduct(code, productData) {
    return await this.updateProductUseCase.execute(code, productData);
  }

  async deleteProduct(code) {
    return await this.deleteProductUseCase.execute(code);
  }

  async getProduct(code) {
    return await this.getProductUseCase.execute(code);
  }

  async getAllProducts() {
    return await this.getAllProductsUseCase.execute();
  }
}

module.exports = ProductService;
