const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  style: {type: String, required: true},
  purchasePrice: {type: Number, required: true},
  salePrice: {type: Number, required: true},
  qtyOnHand: {type: Number, required: true},
  commissionPercentage: {type: Number, required: true},
  discounted: {type: Boolean},
  discountPercentage: {type: Number},
});

module.exports = mongoose.model('Product', productSchema);
