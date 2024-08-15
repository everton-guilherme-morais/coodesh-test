const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController');
const ProductService = require('../../../application/services/productService');

const CreateProduct = require('../../../application/usecases/createProduct');
const UpdateProduct = require('../../../application/usecases/updateProduct');
const DeleteProduct = require('../../../application/usecases/deleteProduct');
const GetProduct = require('../../../application/usecases/getProduct');
const GetAllProducts = require('../../../application/usecases/getAllProducts');

const ProductRepository = require('../../../domain/repositories/productRepository');
const ProductModel = require('../../../infrastructure/database/models/productModel');

const productRepository = new ProductRepository(ProductModel);

const productService = new ProductService(
  new CreateProduct(productRepository),
  new UpdateProduct(productRepository),
  new DeleteProduct(productRepository),
  new GetProduct(productRepository),
  new GetAllProducts(productRepository)
);
const productController = new ProductController(productService);

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/:code', (req, res) => productController.getProduct(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:code', (req, res) => productController.updateProduct(req, res));
router.delete('/:code', (req, res) => productController.deleteProduct(req, res));

module.exports = router;
