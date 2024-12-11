const express = require('express');
const router = express.Router();
const {
  createSponsor,
  getSponsors,
  updateSponsor,
  deleteSponsor,
} = require('../controller/sponsorController');

// CRUD routes for sponsors
router.post('/', createSponsor); // Create sponsor
router.get('/', getSponsors); // Get all sponsors
router.put('/:id', updateSponsor); // Update sponsor by ID
router.delete('/:id', deleteSponsor); // Delete sponsor by ID

module.exports = router;
