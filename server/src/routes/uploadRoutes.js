const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Protect uploads to Admin
router.post(
  '/image',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  uploadController.uploadMiddleware.single('image'),
  uploadController.handleImageUpload
);

router.post(
  '/video',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  uploadController.uploadMiddleware.single('video'),
  uploadController.handleVideoUpload
);

router.post(
  '/document',
  authenticate,
  authorize('SUPER_ADMIN', 'ADMIN'),
  uploadController.uploadMiddleware.single('document'),
  uploadController.handleDocumentUpload
);

module.exports = router;

