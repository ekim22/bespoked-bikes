const Product = require('../models/product');


module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({
      message: 'Fetched products.',
      products: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to fetch products.',
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate({_id: req.params.id}, req.body).lean();
    res.status(200).json({
      message: 'Product was updated!',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to update salesperson',
    });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      style: req.body.style,
      purchasePrice: req.body.purchasePrice,
      salePrice: req.body.salePrice,
      qtyOnHand: req.body.qtyOnHand,
      commissionPercentage: req.body.commissionPercentage,
    };
    await Product.create(newProduct);
    res.status(200).json({
      message: 'Product successfully created!',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server was unable to create product.',
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete({_id: req.params.id}, req.body).lean();
    res.status(200).json({
      message: 'Product was deleted!',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server was unable to remove product.',
    });
  }
};
