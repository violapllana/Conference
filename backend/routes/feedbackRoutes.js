const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks, updateFeedback, deleteFeedback } = require('../controller/feedbackController');

router.post('/feedback', createFeedback);
router.get('/feedback', getFeedbacks);
router.put('/feedback:id', updateFeedback);
router.delete('/feedback:/id', deleteFeedback);


module.exports = router;
