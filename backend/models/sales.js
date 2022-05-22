const mongoose = require('mongoose');


const salesSchema = mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  salesperson: {type: mongoose.Schema.Types.ObjectId, ref: 'Salesperson', required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
  saleDate: {type: Date, required: true},
});

module.exports = mongoose.model('Sales', salesSchema);
