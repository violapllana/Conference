  const Feedback = require('../models/feedback');

  // Create feedback
  const createFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.create({
        username: req.body.username,
        content: req.body.content,
      });
      res.status(201).json(feedback);
    } catch (err) {
      console.error('Error while creating feedback:', err);
      res.status(500).json({ message: 'Error while creating feedback', error: err.message });
    }
  };

  // Get all feedbacks
  const getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.findAll();
      console.log('Feedbacks:', feedbacks); // Verifikoni këtu që feedback-et kthehen
      res.status(200).json(feedbacks);
    } catch (err) {
      res.status(400).json({ message: 'Error while fetching feedbacks', error: err.message });
    }
  };


  // Get feedback by ID
  const getFeedbackById = async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      res.status(200).json(feedback);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching feedback', error: err.message });
    }
  };

  // Update feedback
  const updateFeedback = async (req, res) => {
    try {
      const { username, content } = req.body;
      const [updated] = await Feedback.update(
        { username, content },
        { where: { id: req.params.id } }
      );

      if (updated) {
        const updatedFeedback = await Feedback.findByPk(req.params.id);
        res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
      } else {
        res.status(404).json({ message: 'Feedback not found' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Error while updating feedback', error: err.message });
    }
  };

  // Delete feedback
  const deleteFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      await feedback.destroy();
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error while deleting feedback', error: err.message });
    }
  };

  module.exports = { createFeedback, getFeedbacks, getFeedbackById, updateFeedback, deleteFeedback };
