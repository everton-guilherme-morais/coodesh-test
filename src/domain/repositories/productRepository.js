class ProductRepository {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async getAll(page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        const products = await this.ProductModel.find({})
            .skip(skip)
            .limit(limit);
        
        const totalDocuments = await this.ProductModel.countDocuments({});
        const totalPages = Math.ceil(totalDocuments / limit);

        return {
            products,
            currentPage: page,
            totalPages,
            totalProducts: totalDocuments,
        };
    } catch (error) {
        throw new Error('Erro ao buscar os produtos: ' + error.message);
    }
  }

  async findByCode(code) {
    return await this.ProductModel.findOne({ code });
  }

  async create(product) {
    try {
      const newProduct = new this.ProductModel(product);
      return await newProduct.save();
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      throw new Error('Erro ao criar o produto: ' + error.message);
    }
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
