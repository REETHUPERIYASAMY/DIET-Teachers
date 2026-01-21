const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cluster: {
    type: String,
    required: true
  },
  issueCategory: {
    type: String,
    required: true
  },
  objectives: {
    type: String,
    required: true
  },
  modules: [{
    title: String,
    content: String
  }],
  strategies: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  },
  scheduledDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Training', trainingSchema);