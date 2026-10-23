const express = require('express');
const router = express.Router();
const liveClassController = require('../controllers/liveClassController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');
const { enforceSingleDevice } = require('../middleware/deviceSession');

// Student: get live classes for enrolled courses
router.get('/student', authenticate, enforceSingleDevice, liveClassController.getStudentLiveClasses);

// Admin: get all live classes
router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), liveClassController.getAllLiveClasses);

// Admin: manage live classes
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), liveClassController.createLiveClass);
router.put('/:id/cancel', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), liveClassController.cancelLiveClass);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), liveClassController.updateLiveClass);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), liveClassController.deleteLiveClass);

module.exports = router;
