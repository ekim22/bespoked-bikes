const Salespeople = require('../models/salesperson');


module.exports.getSalespeople = async (req, res) => {
  try {
    const salesPeople = await Salespeople.find().lean();
    res.status(200).json({
      message: 'Fetched salespeople.',
      salesPeople: salesPeople,
    });
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server failed to update salesperson.',
    });
  }
};

module.exports.createSalesperson = async (req, res) => {
  try {
    const newSalesperson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      startDate: req.body.startDate,
      terminationDate: req.body.terminationDate,
      manager: req.body.manager,
    };
    await Salespeople.create(newSalesperson);
    res.status(200).json({
      message: 'Salesperson successfully added!',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server was unable to add salesperson.',
    });
  }
};
