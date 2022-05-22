const express = require('express');
const router = express.Router();

const discountController = require('../controllers/discount');

router.post('/create', discountController.createDiscount);

module.exports = router;
