const mongoose = require('mongoose');


const salesSchema = mongoose.Schema({
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  salespersonId: {type: mongoose.Schema.Types.ObjectId, ref: 'Salesperson', required: true},
  customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  saleDate: {type: Date, required: true},
});

module.exports = mongoose.model('Sales', salesSchema);
