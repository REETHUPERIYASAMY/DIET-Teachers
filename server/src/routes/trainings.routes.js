const express = require('express');
const router = express.Router();
const trainingsController = require('../controllers/trainings.controller');
const { authMiddleware: verifyToken, isAdmin } = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// Route to create a new training
router.post('/', verifyToken, roleMiddleware(['trainer']), trainingsController.createTraining);

// Route to get all trainings
router.get('/', verifyToken, trainingsController.getAllTrainings);

// Route to get a specific training by ID
router.get('/:id', verifyToken, trainingsController.getTrainingById);

// Route to update a training by ID
router.put('/:id', verifyToken, roleMiddleware(['trainer']), trainingsController.updateTraining);

// Route to delete a training by ID
router.delete('/:id', verifyToken, roleMiddleware(['trainer']), trainingsController.deleteTraining);

module.exports = router;