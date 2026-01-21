const express = require('express');
const router = express.Router();
const { generateTraining, saveTraining, getAllTrainings, getTrainingById } = require('../controllers/trainingController');
const { protect } = require('../middleware/authMiddleware');

// Generate training plan
router.post('/generate', protect, generateTraining);

// Save training plan
router.post('/', protect, saveTraining);

// Get all trainings
router.get('/', protect, getAllTrainings);

// Get training by ID
router.get('/:id', protect, getTrainingById);

module.exports = router;