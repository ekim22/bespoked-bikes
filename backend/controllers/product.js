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
    await Product.findById({_id: req.params.id}, req.body).lean();
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
