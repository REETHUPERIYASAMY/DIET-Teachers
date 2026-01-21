const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbackByTraining } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

// Submit feedback
router.post('/', protect, submitFeedback);

// Get feedback for a training
router.get('/training/:trainingId', protect, getFeedbackByTraining);

module.exports = router;