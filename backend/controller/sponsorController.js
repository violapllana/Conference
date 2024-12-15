// controller/sponsorController.js
const Sponsor = require('../models/sponsor');

// Krijimi i sponsorit
const createSponsor = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newSponsor = await Sponsor.create({ name, link });
    res.status(201).json({ message: 'Sponsor u krijua me sukses', sponsor: newSponsor });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e sponsorit', error: err });
  }
};

// Marrja e të gjithë sponsoreve
const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll();
    res.status(200).json(sponsors);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e sponsoreve', error: err });
  }
};

// Përditësimi i një sponsori ekzistues
const updateSponsor = async (req, res) => {
  try {
    const { name, link } = req.body;
    const [updated] = await Sponsor.update(
      { name, link },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedSponsor = await Sponsor.findByPk(req.params.id);
      res.status(200).json({ message: 'Sponsor u përditësua me sukses', sponsor: updatedSponsor });
    } else {
      res.status(404).json({ message: 'Sponsor nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e sponsorit', error: err });
  }
};

// Fshirja e një sponsori
const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor nuk u gjet' });
    }
    await sponsor.destroy();
    res.status(200).json({ message: 'Sponsor u fshi me sukses', sponsor: sponsor });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e sponsorit', error: err });
  }
};

module.exports = { createSponsor, getSponsors, updateSponsor, deleteSponsor };
