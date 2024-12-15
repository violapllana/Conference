const express = require('express');
const router = express.Router();
const {
  createContact,getContacts,updateContact,deleteContact
} = require('../controller/contactController');

// CRUD routes për Contacts
router.post('/', createContact); // Shto një kontakt
router.get('/', getContacts); // Merr të gjithë kontaktet
router.put('/:id', updateContact); // Përditëso një kontakt me ID
router.delete('/:id', deleteContact); // Fshi një kontakt me ID

module.exports = router;