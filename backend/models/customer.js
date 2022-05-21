const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  startDate: {type: Date, required: true},
});

module.exports = mongoose.model('Customer', customerSchema);
