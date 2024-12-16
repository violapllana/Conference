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
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e pjesmarresve', error: err });
  }
};

// Përditësimi i një pjesmarresi ekzistues
const updateParticipant = async (req, res) => {
  try {
    const { name, email, conferenceId } = req.body;
    const [updated] = await Participant.update(
      { name, email, conferenceId },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedParticipant = await Participant.findByPk(req.params.id);
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

module.exports = { createParticipant, getParticipants, updateParticipant, deleteParticipant };
