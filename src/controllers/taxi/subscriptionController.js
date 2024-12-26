const Taxi = require('../../models/Taxi');
const { validateSubscriptionPayment } = require('../../utils/validation');

exports.updateSubscription = async (req, res) => {
  try {
    const { amount } = req.body;
    
    const validationError = validateSubscriptionPayment(amount);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const taxi = await Taxi.findByIdAndUpdate(
      req.params.taxiId,
      {
        'subscription.active': true,
        'subscription.lastPayment': Date.now(),
        'subscription.amount': amount,
        'subscription.expiryDate': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      },
      { new: true }
    );

    if (!taxi) {
      return res.status(404).json({ message: 'Taxi not found' });
    }

    res.json({ taxi });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription' });
  }
};