const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authenticate');

router.get('/my', authenticate, notificationController.getMyNotifications);
router.put('/mark-read/:id', authenticate, notificationController.markAsRead);

module.exports = router;
