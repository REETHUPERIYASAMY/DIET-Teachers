const Training = require('../models/Training.model');
const Plan = require('../models/Plan.model');

// Create a new training
exports.createTraining = async (req, res) => {
    try {
        const training = new Training(req.body);
        await training.save();
        res.status(201).json(training);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all trainings
exports.getAllTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get training by ID
exports.getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.status(200).json(training);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update training
exports.updateTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.status(200).json(training);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete training
exports.deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate training plan based on classroom issues
exports.generateTrainingPlan = async (req, res) => {
    try {
        const { issues } = req.body;
        const plan = await Plan.create({ issues });
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};