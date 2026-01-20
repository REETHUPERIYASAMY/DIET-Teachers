const express = require('express');
const router = express.Router();
const trainingsController = require('../controllers/trainings.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// Route to create a new training
router.post('/', authMiddleware.verifyToken, roleMiddleware.isTrainer, trainingsController.createTraining);

// Route to get all trainings
router.get('/', authMiddleware.verifyToken, trainingsController.getAllTrainings);

// Route to get a specific training by ID
router.get('/:id', authMiddleware.verifyToken, trainingsController.getTrainingById);

// Route to update a training by ID
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isTrainer, trainingsController.updateTraining);

// Route to delete a training by ID
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isTrainer, trainingsController.deleteTraining);

module.exports = router;