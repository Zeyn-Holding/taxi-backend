const Taxi = require('../../models/Taxi');
const { validateTaxiRegistration } = require('../../utils/validation');

exports.registerTaxi = async (req, res) => {
  try {
    const { registrationNumber, driverId } = req.body;
    
    const validationError = validateTaxiRegistration(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const taxi = await Taxi.create({
      registrationNumber,
      driver: driverId,
      operator: req.user.id,
      status: 'pending'
    });

    res.status(201).json({ taxi });
  } catch (error) {
    res.status(500).json({ message: 'Error registering taxi' });
  }
};

exports.updateTaxiStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taxi = await Taxi.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!taxi) {
      return res.status(404).json({ message: 'Taxi not found' });
    }

    res.json({ taxi });
  } catch (error) {
    res.status(500).json({ message: 'Error updating taxi status' });
  }
};