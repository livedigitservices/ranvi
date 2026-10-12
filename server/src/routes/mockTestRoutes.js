const express = require('express');
const router = express.Router();
const mockTestController = require('../controllers/mockTestController');
const { authenticate, optionalAuth } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Public / Student
router.get('/', mockTestController.getMockTests);
router.get('/:slug', optionalAuth, mockTestController.getMockTestBySlug);

// Admin Questions (Specific routes first)
router.put('/questions/:questionId', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.updateQuestion);
router.delete('/questions/:questionId', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.deleteQuestion);
router.get('/:mockTestId/admin-questions', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.getAdminMockTestQuestions);
router.post('/:mockTestId/questions', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.addQuestion);
router.post('/:mockTestId/bulk-questions', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.bulkUploadQuestions);

// Admin Mock Tests
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.createMockTest);
router.post('/upload-paper', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.uploadMockTestPaper);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.updateMockTest);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), mockTestController.deleteMockTest);

module.exports = router;

