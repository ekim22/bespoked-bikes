const Salespeople = require('../models/salesperson');


module.exports.getSalespeople = async (req, res) => {
  try {
    const salesPeople = await Salespeople.find().lean();
    res.status(200).json({
      message: 'Fetched salespeople.',
      salesPeople: salesPeople,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server failed to fetch sales people.',
    });
  }
};

module.exports.updateSalesperson = async (req, res) => {
  try {
    await Salespeople.findByIdAndUpdate({_id: req.params.id}, req.body).lean();
    res.status(200).json({
      message: 'Salesperson was updated!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server failed to update salesperson',
    });
  }
};

