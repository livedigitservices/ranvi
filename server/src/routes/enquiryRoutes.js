const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');
const { enquiryLimiter } = require('../middleware/rateLimiter');

router.post('/', enquiryLimiter, enquiryController.createEnquiry);
router.get('/admin', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), enquiryController.getEnquiries);
router.put('/admin/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), enquiryController.updateEnquiryStatus);

module.exports = router;
