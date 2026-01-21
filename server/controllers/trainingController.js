const Training = require('../models/Training');
const Issue = require('../models/Issue');
const { generateTrainingPlan } = require('../utils/aiHelper');

// Generate training plan using AI
const generateTraining = async (req, res) => {
  try {
    const { cluster, issueCategory } = req.body;
    
    // Get sample issues for the selected cluster and category
    const sampleIssues = await Issue.find({ 
      cluster, 
      category: issueCategory 
    }).limit(5);
    
    // Format issues for AI
    const issuesText = sampleIssues.map(issue => issue.description).join('. ');
    
    // Generate training plan
    const trainingPlan = await generateTrainingPlan(cluster, issueCategory, issuesText);
    
    res.json(trainingPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save training plan
const saveTraining = async (req, res) => {
  try {
    const { title, cluster, issueCategory, objectives, modules, strategies } = req.body;
    
    const training = await Training.create({
      title,
      cluster,
      issueCategory,
      objectives,
      modules,
      strategies,
      createdBy: req.user._id
    });
    
    res.status(201).json(training);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all trainings
const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().populate('createdBy', 'name email');
    res.json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get training by ID
const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    res.json(training);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateTraining, saveTraining, getAllTrainings, getTrainingById };