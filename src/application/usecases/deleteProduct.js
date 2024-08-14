class DeleteProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(code) {
    return await this.productRepository.delete(code);
  }
}

module.exports = DeleteProduct;
