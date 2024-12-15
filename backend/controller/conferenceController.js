// controller/conferenceController.js
const Conference = require('../models/conference');

// Krijimi i konferencës
const createConference = async (req, res) => {
  try {
    const { name, location, date } = req.body;
    const newConference = await Conference.create({ name, location, date });
    res.status(201).json({ message: 'Konferenca u krijua me sukses', conference: newConference });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e konferencës', error: err });
  }
};

// Marrja e të gjitha konferencave
const getConferences = async (req, res) => {
  try {
    const conferences = await Conference.findAll();
    res.status(200).json(conferences);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e konferencave', error: err });
  }
};

// Përditësimi i një konference ekzistuese
const updateConference = async (req, res) => {
  try {
    const { name, location, date } = req.body;
    const [updated] = await Conference.update(
      { name, location, date },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedConference = await Conference.findByPk(req.params.id);
      res.status(200).json({ message: 'Konferenca u përditësua me sukses', conference: updatedConference });
    } else {
      res.status(404).json({ message: 'Konferenca nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e konferencës', error: err });
  }
};

// Fshirja e një konference
const deleteConference = async (req, res) => {
  try {
    const conference = await Conference.findByPk(req.params.id);
    if (!conference) {
      return res.status(404).json({ message: 'Konferenca nuk u gjet' });
    }
    await conference.destroy();
    res.status(200).json({ message: 'Konferenca u fshi me sukses', conference: conference });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e konferencës', error: err });
  }
};

module.exports = { createConference, getConferences, updateConference, deleteConference };
