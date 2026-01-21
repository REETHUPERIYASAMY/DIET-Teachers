const express = require('express');
const router = express.Router();
const { submitIssue, getAllIssues, getIssuesByCluster, getIssueStats } = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');

// Submit a new issue
router.post('/', protect, submitIssue);

// Get all issues
router.get('/', protect, getAllIssues);

// Get issues by cluster
router.get('/cluster/:cluster', protect, getIssuesByCluster);

// Get issue statistics for dashboard
router.get('/stats', protect, getIssueStats);

module.exports = router;