class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(code, updates) {
    return await this.productRepository.update(code, updates);
  }
}

module.exports = UpdateProduct;
