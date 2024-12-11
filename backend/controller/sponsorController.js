const Sponsor = require('../models/sponsor');

// Krijimi i një sponsori të ri
const createSponsor = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newSponsor = await Sponsor.create({ name, email, phone, address });
    res.status(201).json({ message: 'Sponsori u krijua me sukses', sponsor: newSponsor });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e sponsorit', error: err });
  }
};

// Marrja e të gjithë sponsorëve
const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll();
    res.status(200).json(sponsors);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e sponsorëve', error: err });
  }
};

// Përditësimi i një sponsori ekzistues
const updateSponsor = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const [updated] = await Sponsor.update(
      { name, email, phone, address },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedSponsor = await Sponsor.findByPk(req.params.id);
      res.status(200).json({ message: 'Sponsori u përditësua me sukses', sponsor: updatedSponsor });
    } else {
      res.status(404).json({ message: 'Sponsori nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e sponsorit', error: err });
  }
};

// Fshirja e një sponsori
const deleteSponsor = async (req, res) => {
  try {
    console.log('Marrja e kërkesës DELETE për sponsorin me ID:', req.params.id); // Shtimi i log-ut për debugging

    const sponsor = await Sponsor.findByPk(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsori nuk u gjet' });
    }
    await sponsor.destroy();
    res.status(200).json({ message: 'Sponsori u fshi me sukses', sponsor: sponsor });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e sponsorit', error: err });
  }
};

// Eksportimi i funksioneve
module.exports = { createSponsor, getSponsors, updateSponsor, deleteSponsor };
