const ContactForm = require('../models/contactform'); // Importing the ContactForm model

// Create a new contact form entry
const createContact = async (req, res) => {
  try {
    const { emri, email, mesazhi } = req.body; // Destructuring the data from the request body
    const contact = await ContactForm.create({ emri, email, mesazhi });
    return res.status(201).json(contact); // Responding with the created contact
  } catch (error) {
    return res.status(500).json({ message: 'Error creating contact', error });
  }
};

// Get all contact form entries
const getContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.findAll(); // Retrieving all contacts
    return res.status(200).json(contacts); // Responding with the list of contacts
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// Update a contact form entry
const updateContact = async (req, res) => {
  try {
    const { id } = req.params; // Retrieving the ID from the URL parameters
    const { statusi } = req.body; // Destructuring the new status value from the request body

    const contact = await ContactForm.findByPk(id); // Finding the contact by ID
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.statusi = statusi; // Updating the status
    await contact.save(); // Saving the changes

    return res.status(200).json(contact); // Responding with the updated contact
  } catch (error) {
    return res.status(500).json({ message: 'Error updating contact', error });
  }
};

// Delete a contact form entry
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params; // Retrieving the ID from the URL parameters

    const contact = await ContactForm.findByPk(id); // Finding the contact by ID
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.destroy(); // Deleting the contact

    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting contact', error });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact
};
