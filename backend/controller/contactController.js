const ContactForm = require('../models/contactForm'); // Import the ContactForm model

// Krijimi i mesazhit të kontaktit
const createContact = async (req, res) => {
  try {
    const { emri, email, mesazhi } = req.body; // Destructuring data from the request body

    const newContact = await ContactForm.create({ emri, email, mesazhi });
    res.status(201).json({ message: 'Mesazhi u krijua me sukses', contact: newContact });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e mesazhit', error: err.message });
  }
};

// Marrja e të gjithë mesazheve
const getContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.findAll(); // Retrieving all contacts
    res.status(200).json(contacts); // Respond with the list of contacts
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e mesazheve', error: err.message });
  }
};

// Fshirja e një mesazhi
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params; // Retrieving the ID from the URL parameters

    const contact = await ContactForm.findByPk(id); // Finding the contact by ID
    if (!contact) {
      return res.status(404).json({ message: 'Mesazhi nuk u gjet' });
    }

    await contact.destroy(); // Deleting the contact
    res.status(200).json({ message: 'Mesazhi u fshi me sukses', contact });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e mesazhit', error: err.message });
  }
};

module.exports = { createContact, getContacts, deleteContact };
