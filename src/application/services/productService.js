class ProductService {
  constructor(createProduct, updateProduct, deleteProduct, getProduct, getAllProducts) {
    this.createProduct = createProduct;
    this.updateProduct = updateProduct;
    this.deleteProduct = deleteProduct;
    this.getProductUseCase = getProduct;
    this.getAllProductsUseCase = getAllProducts;
  }

  async createProduct(productData) {
    return await this.createProduct.execute(productData);
  }

  async updateProduct(code, productData) {
    return await this.updateProduct.execute(code, productData);
  }

  async deleteProduct(code) {
    return await this.deleteProduct.execute(code);
  }

  async getProduct(code) {
    return await this.getProductUseCase.execute(code);
  }

  async getAllProducts() {
    return await this.getAllProductsUseCase.execute();
  }
}

module.exports = ProductService;
