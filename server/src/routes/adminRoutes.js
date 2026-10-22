const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Protect all admin endpoints
router.use(authenticate, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/dashboard-stats', adminController.getDashboardStats);
router.get('/students', adminController.getStudents);
router.post('/students/:studentId/reset-device', adminController.resetStudentDevice);
router.put('/students/:studentId/toggle-status', adminController.toggleStudentStatus);
router.get('/audit-logs', adminController.getAuditLogs);
router.post('/audit-logs/cleanup', adminController.triggerAuditLogCleanup);

module.exports = router;
