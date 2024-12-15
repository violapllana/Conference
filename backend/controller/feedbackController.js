// controller/feedbackController.js
const Feedback = require('../models/feedback');

// Krijimi i feedback-ut
const createFeedback = async (req, res) => {
  try {
    const { participantId, message } = req.body;
    const newFeedback = await Feedback.create({ participantId, message });
    res.status(201).json({ message: 'Feedback-u u krijua me sukses', feedback: newFeedback });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e feedback-ut', error: err });
  }
};

// Marrja e të gjitha feedback-eve
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e feedback-eve', error: err });
  }
};

// Përditësimi i një feedback-u ekzistues
const updateFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const [updated] = await Feedback.update(
      { message },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedFeedback = await Feedback.findByPk(req.params.id);
      res.status(200).json({ message: 'Feedback-u u përditësua me sukses', feedback: updatedFeedback });
    } else {
      res.status(404).json({ message: 'Feedback-u nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e feedback-ut', error: err });
  }
};

// Fshirja e një feedback-u
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback-u nuk u gjet' });
    }
    await feedback.destroy();
    res.status(200).json({ message: 'Feedback-u u fshi me sukses', feedback: feedback });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e feedback-ut', error: err });
  }
};

module.exports = { createFeedback, getFeedbacks, updateFeedback, deleteFeedback };
