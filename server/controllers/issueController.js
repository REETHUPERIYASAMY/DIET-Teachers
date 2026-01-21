const Issue = require('../models/Issue');

// Submit a new issue
const submitIssue = async (req, res) => {
  try {
    const { cluster, subject, category, description } = req.body;
    
    const issue = await Issue.create({
      teacherId: req.user._id,
      cluster,
      subject,
      category,
      description
    });

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all issues (for DIET faculty)
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('teacherId', 'name email');
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get issues by cluster
const getIssuesByCluster = async (req, res) => {
  try {
    const { cluster } = req.params;
    const issues = await Issue.find({ cluster }).populate('teacherId', 'name email');
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get issues for dashboard statistics
const getIssueStats = async (req, res) => {
  try {
    // Total issues
    const totalIssues = await Issue.countDocuments();
    
    // Top cluster
    const topCluster = await Issue.aggregate([
      { $group: { _id: '$cluster', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    // Top issue type
    const topIssueType = await Issue.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    // All clusters
    const clusters = await Issue.distinct('cluster');
    
    res.json({
      totalIssues,
      topCluster: topCluster.length > 0 ? topCluster[0]._id : 'N/A',
      topIssueType: topIssueType.length > 0 ? topIssueType[0]._id : 'N/A',
      clusters
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitIssue, getAllIssues, getIssuesByCluster, getIssueStats };