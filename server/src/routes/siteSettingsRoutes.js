const express = require('express');
const router = express.Router();
const siteSettingsController = require('../controllers/siteSettingsController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

router.get('/', siteSettingsController.getSettings);
router.put('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), siteSettingsController.updateSettings);

module.exports = router;
