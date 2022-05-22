const mongoose = require('mongoose');


const salesSchema = mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  productName: {type: String, required: true},
  salesperson: {type: mongoose.Schema.Types.ObjectId, ref: 'Salesperson', required: true},
  salespersonName: {type: String, required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  customerName: {type: String, required: true},
  salePrice: {type: Number, required: true},
  commissionPercentage: {type: Number, required: true},
  salespersonCommission: {type: Number, required: true},
  saleDate: {type: Date, required: true},
});

module.exports = mongoose.model('Sales', salesSchema);
