const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const taxiController = require('../controllers/taxi/taxiController');
const documentController = require('../controllers/taxi/documentController');
const subscriptionController = require('../controllers/taxi/subscriptionController');

// Taxi registration routes
router.post(
  '/register',
  protect,
  authorize('operator', 'admin'),
  taxiController.registerTaxi
);

router.patch(
  '/:id/status',
  protect,
  authorize('operator', 'admin'),
  taxiController.updateTaxiStatus
);

// Document routes
router.post(
  '/:taxiId/documents',
  protect,
  authorize('operator', 'admin'),
  documentController.addDocument
);

// Subscription routes
router.post(
  '/:taxiId/subscription',
  protect,
  authorize('operator'),
  subscriptionController.updateSubscription
);

module.exports = router;