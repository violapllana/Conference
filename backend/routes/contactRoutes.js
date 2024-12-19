const express = require('express');
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
} = require('../controller/contactController');

// CRUD routes për mesazhet e kontaktit
router.post('/', createContact); // Krijo mesazh
router.get('/', getContacts); // Merr të gjithë mesazhet
router.delete('/:id', deleteContact); // Fshi mesazh me ID

module.exports = router;
