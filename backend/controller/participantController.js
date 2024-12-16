const Participant = require('../models/Participant');

// Krijimi i një pjesëmarrësi të ri
const createParticipant = async (req, res) => {
  try {
    const { firstName, lastName, email, birthYear, schedule } = req.body;

    const newParticipant = await Participant.create({ firstName, lastName, email, birthYear, schedule });
    res.status(201).json({
      message: 'Participant created successfully',
      participant: newParticipant,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error creating participant',
      error: err,
    });
  }
};

// Marrja e të gjithë pjesëmarrësve
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (err) {
    res.status(400).json({
      message: 'Error fetching participants',
      error: err,
    });
  }
};

// Përditësimi i një pjesëmarrësi ekzistues
const updateParticipant = async (req, res) => {
  try {
    const { firstName, lastName, email, birthYear, schedule } = req.body;

    const [updated] = await Participant.update(
      { firstName, lastName, email, birthYear, schedule },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedParticipant = await Participant.findByPk(req.params.id);
      res.status(200).json({
        message: 'Participant updated successfully',
        participant: updatedParticipant,
      });
    } else {
      res.status(404).json({ message: 'Participant not found' });
    }
  } catch (err) {
    res.status(400).json({
      message: 'Error updating participant',
      error: err,
    });
  }
};

// Fshirja e një pjesëmarrësi
const deleteParticipant = async (req, res) => {
  try {
    console.log('DELETE request received for participant ID:', req.params.id);

    const participant = await Participant.findByPk(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    await participant.destroy();
    res.status(200).json({
      message: 'Participant deleted successfully',
      participant: participant,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error deleting participant',
      error: err,
    });
  }
};

// Eksportimi i funksioneve
module.exports = { createParticipant, getParticipants, updateParticipant, deleteParticipant };