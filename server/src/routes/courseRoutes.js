const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, optionalAuth } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// Public routes
router.get('/', courseController.getCourses);
router.get('/categories', courseController.getCategories);
router.get('/:slug', optionalAuth, courseController.getCourseBySlug);

// Admin routes
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), courseController.createCourse);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), courseController.updateCourse);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), courseController.deleteCourse);

module.exports = router;
