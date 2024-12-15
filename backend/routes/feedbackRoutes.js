// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
} = require('../controller/feedbackController');

// CRUD routes për feedback-et
router.post('/', createFeedback); // Krijo feedback
router.get('/', getFeedbacks); // Merr të gjitha feedback-et
router.put('/:id', updateFeedback); // Përditëso feedback me ID
router.delete('/:id', deleteFeedback); // Fshi feedback me ID

module.exports = router;
