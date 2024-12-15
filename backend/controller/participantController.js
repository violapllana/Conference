<<<<<<< HEAD
// controller/participantController.js
const Participant = require('../models/participant');

// Krijimi i pjesmarresit
const createParticipant = async (req, res) => {
  try {
    const { name, email, conferenceId } = req.body;
    const newParticipant = await Participant.create({ name, email, conferenceId });
    res.status(201).json({ message: 'Pjesmarresi u krijua me sukses', participant: newParticipant });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e pjesmarresit', error: err });
  }
};

// Marrja e të gjithë pjesmarresve
=======
const Participant = require('../models/participant');

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
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (err) {
<<<<<<< HEAD
    res.status(400).json({ message: 'Gabim në marrjen e pjesmarresve', error: err });
  }
};

// Përditësimi i një pjesmarresi ekzistues
const updateParticipant = async (req, res) => {
  try {
    const { name, email, conferenceId } = req.body;
    const [updated] = await Participant.update(
      { name, email, conferenceId },
=======
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
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedParticipant = await Participant.findByPk(req.params.id);
<<<<<<< HEAD
      res.status(200).json({ message: 'Pjesmarresi u përditësua me sukses', participant: updatedParticipant });
    } else {
      res.status(404).json({ message: 'Pjesmarresi nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e pjesmarresit', error: err });
  }
};

// Fshirja e një pjesmarresi
const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Pjesmarresi nuk u gjet' });
    }
    await participant.destroy();
    res.status(200).json({ message: 'Pjesmarresi u fshi me sukses', participant: participant });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e pjesmarresit', error: err });
  }
};

=======
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
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
module.exports = { createParticipant, getParticipants, updateParticipant, deleteParticipant };
