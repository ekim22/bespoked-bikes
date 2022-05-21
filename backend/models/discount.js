const mongoose = require('mongoose');


const discountSchema = mongoose.Schema({
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  discountPercentage: {type: Number, required: true},
});

module.exports = mongoose.model('Discount', discountSchema);
