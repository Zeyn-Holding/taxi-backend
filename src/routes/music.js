const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const musicController = require('../controllers/music/musicController');

router.post(
  '/upload',
  protect,
  authorize('insertionAgent', 'admin'),
  musicController.uploadMusic
);

router.get(
  '/',
  protect,
  musicController.getAllMusic
);

router.delete(
  '/:id',
  protect,
  authorize('insertionAgent', 'admin'),
  musicController.deleteMusic
);

module.exports = router;