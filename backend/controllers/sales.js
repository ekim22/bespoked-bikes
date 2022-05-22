const Sales = require('../models/sales');

module.exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find()
        .populate('product salesperson customer')
        .lean();

    res.status(200).json({
      message: 'Fetched sales.',
      sales: sales,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to fetch sales people.',
    });
  }
};

module.exports.createSale = async (req, res) => {
  try {
    const newSale = {
      product: req.body.productId,
      salesperson: req.body.salespersonId,
      customer: req.body.customerId,
      saleDate: new Date(req.body.saleDate),
    };
    await Sales.create(newSale);
    res.status(201).json({
      message: 'Sale successfully added to sales.',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to create new sale.',
    });
  }
};
