class GetProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(code) {
    return await this.productRepository.findByCode(code);
  }
}

module.exports = GetProduct;
