const Feedback = require('../models/Feedback');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { trainingId, rating, feedback } = req.body;
    
    const newFeedback = await Feedback.create({
      trainingId,
      teacherId: req.user._id,
      rating,
      feedback
    });
    
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get feedback for a training
const getFeedbackByTraining = async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    const feedbacks = await Feedback.find({ trainingId })
      .populate('teacherId', 'name email')
      .populate('trainingId', 'title');
    
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitFeedback, getFeedbackByTraining };