const express = require('express');
const router = express.Router();
const entranceExamController = require('../controllers/entranceExamController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Public endpoints
router.get('/', entranceExamController.getEntranceExams);
router.get('/:id', entranceExamController.getEntranceExamById);

// Admin-only CRUD operations
router.post(
  '/',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  entranceExamController.createEntranceExam
);

router.post(
  '/seed-defaults',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  entranceExamController.seedDefaultEntranceExams
);

router.put(
  '/:id',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  entranceExamController.updateEntranceExam
);

router.delete(
  '/:id',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  entranceExamController.deleteEntranceExam
);

module.exports = router;
