const mongoose = require('mongoose');


const salespersonSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  startDate: {type: Date, required: true},
  terminationDate: {type: Date, required: true},
  manager: {type: String, required: true},
});

module.exports = mongoose.model('Salesperson', salespersonSchema);
