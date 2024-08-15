class ProductRepository {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async getAll() {
    try {
      const products = await this.ProductModel.find({});
      return products;
    } catch (error) {
      throw new Error('Erro ao buscar os produtos: ' + error.message);
    }
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
    try {
      return await this.ProductModel.deleteOne({ code });
    } catch (error) {
      throw new Error('Erro ao excluir o produto: ' + error.message);
    }
  }
}

module.exports = ProductRepository;
