const Discount = require('../models/discount');

module.exports.getDiscounts = async () => {
  try {
    return await Discount.find().lean();
  } catch (e) {
    console.log(e);
  }
};

module.exports.createDiscount = async (req, res) => {
  try {
    await Discount.create(req.body);
    res.status(200).json({
      message: 'Discount successfully registered.',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to create discount.',
    });
  }
};

