const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('', productController.getProducts);
router.post('/create', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;
