const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Public endpoints
router.get('/', facultyController.getFacultyList);
router.get('/:id', facultyController.getFacultyById);

// Admin-only endpoints
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), facultyController.createFaculty);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), facultyController.updateFaculty);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), facultyController.deleteFaculty);

module.exports = router;
