class ProductService {
  constructor(createProduct, updateProduct, deleteProduct, getProduct) {
    this.createProduct = createProduct;
    this.updateProduct = updateProduct;
    this.deleteProduct = deleteProduct;
    this.getProduct = getProduct;
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
    return await this.getProduct.execute(code);
  }
}

module.exports = ProductService;
