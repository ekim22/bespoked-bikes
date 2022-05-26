const Sales = require('../models/sales');
const Product = require('../models/product');
const Customer = require('../models/customer');
const Salesperson = require('../models/salesperson');

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
    const product = await Product.findById(req.body.product).then(
        (product) => {
          product.qtyOnHand -= 1;
          return product.save().then(product);
        },
    );
    const customer = await Customer.findById(req.body.customer);
    const salesperson = await Salesperson.findById(req.body.salesperson);
    const newSale = {
      product: req.body.product,
      productName: product.name,
      manufacturer: product.manufacturer,
      style: product.style,
      purchasePrice: product.purchasePrice,
      salePrice: req.body.productPrice,
      commissionPercentage: product.commissionPercentage,
      salespersonCommission: product.salePrice * product.commissionPercentage,
      qtyOnHand: product.qtyOnHand,
      salesperson: req.body.salesperson,
      salespersonName: salesperson.firstName + ' ' + salesperson.lastName,
      customer: req.body.customer,
      customerName: customer.firstName + ' ' + customer.lastName,
      saleDate: new Date(req.body.saleDate),
    };
    await Sales.create(newSale);
    res.status(201).json({
      message: 'Sale was successfully created.',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to create new sale.',
    });
  }
};
