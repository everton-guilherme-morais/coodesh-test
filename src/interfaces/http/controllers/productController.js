class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async getAllProducts(req, res) {
    console.log('teste hehe')
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.productService.getProduct(req.params.code);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await this.productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await this.productService.updateProduct(req.params.code, req.body);
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await this.productService.deleteProduct(req.params.code);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
