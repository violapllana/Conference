const Contact = require('../models/contact'); // Importo modelin e Contact

// Shto një kontakt të ri
const createContact = async (req, res) => {
  try {
    const { email, message } = req.body;
    const newContact = await Contact.create({ email, message });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Gabim gjatë krijimit të kontaktit' });
  }
};

// Merr të gjithë kontaktet
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Gabim gjatë marrjes së kontakteve' });
  }
};

// Përditëso një kontakt ekzistues
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, message } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Kontakti nuk u gjet' });
    }

    contact.email = email || contact.email;
    contact.message = message || contact.message;

    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Gabim gjatë përditësimit të kontaktit' });
  }
};

// Fshi një kontakt
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Kontakti nuk u gjet' });
    }

    await contact.destroy();
    res.status(200).json({ message: 'Kontakti u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ error: 'Gabim gjatë fshirjes së kontaktit' });
  }
};
module.exports = {createContact,getContacts,updateContact,deleteContact};