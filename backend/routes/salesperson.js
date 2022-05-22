const express = require('express');
const router = express.Router();

const salespersonController = require('../controllers/salesperson');


router.get('', salespersonController.getSalespeople);
router.post('/create', salespersonController.createSalesperson);
router.put('/:id', salespersonController.updateSalesperson);

module.exports = router;
