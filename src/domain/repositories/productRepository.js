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
    console.log(product, 'product')
    const newProduct = new this.ProductModel(product);
    return await newProduct.save();
  }

  async update(code, updates) {
    console.log(code, 'code update')
    return await this.ProductModel.findOneAndUpdate({ code }, updates, { new: true });
  }

  async delete(code) {
    console.log(code, 'code delete')
    return await this.update(code, { status: 'trash' });
  }
}

module.exports = ProductRepository;
