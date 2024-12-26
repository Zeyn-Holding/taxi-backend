const Taxi = require('../../models/Taxi');
const { validateDocument } = require('../../utils/validation');

exports.addDocument = async (req, res) => {
  try {
    const { type, url } = req.body;
    
    const validationError = validateDocument({ type, url });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const taxi = await Taxi.findByIdAndUpdate(
      req.params.taxiId,
      { 
        $push: { 
          documents: { type, url, verified: false } 
        } 
      },
      { new: true }
    );

    if (!taxi) {
      return res.status(404).json({ message: 'Taxi not found' });
    }

    res.json({ taxi });
  } catch (error) {
    res.status(500).json({ message: 'Error adding document' });
  }
};