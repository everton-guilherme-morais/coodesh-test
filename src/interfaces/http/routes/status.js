const express = require('express');
const router = express.Router();

const StatusService = require('../../../application/services/statusService');
const StatusController = require('../../../interfaces/http/controllers/statusController');
const ProductRepository = require('../../../domain/repositories/productRepository');
const ProductModel = require('../../../infrastructure/database/models/productModel');
const { cronService } = require('../../../infrastructure/jobs/importData');

const productRepository = new ProductRepository(ProductModel);
const statusService = new StatusService(productRepository, cronService);
const statusController = new StatusController(statusService);

router.get('/', (req, res) => statusController.getStatus(req, res));

module.exports = router;
