const Customer = require('../models/customer');

module.exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().lean();
    res.status(200).json({
      message: 'Fetched customers.',
      customers: customers,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to fetch customers.',
    });
  }
};
