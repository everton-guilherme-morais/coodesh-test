class ProductRepository {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async findAll() {
    return await this.ProductModel.find();
  }

  async findByCode(code) {
    return await this.ProductModel.findOne({ code });
  }

  async create(product) {
    const newProduct = new this.ProductModel(product);
    return await newProduct.save();
  }

  async update(code, updates) {
    return await this.ProductModel.findOneAndUpdate({ code }, updates, { new: true });
  }

  async delete(code) {
    return await this.update(code, { status: 'trash' });
  }
}

module.exports = ProductRepository;
