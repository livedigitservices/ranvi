const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate } = require('../middleware/authenticate');
const { enforceSingleDevice } = require('../middleware/deviceSession');

router.get('/dashboard', authenticate, enforceSingleDevice, studentController.getStudentDashboard);

module.exports = router;
