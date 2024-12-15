// routes/sponsorRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSponsor,
  getSponsors,
  updateSponsor,
  deleteSponsor,
} = require('../controller/sponsorController');

// CRUD routes për sponsoret
router.post('/', createSponsor); // Krijo sponsor
router.get('/', getSponsors); // Merr të gjithë sponsorët
router.put('/:id', updateSponsor); // Përditëso sponsor me ID
router.delete('/:id', deleteSponsor); // Fshi sponsor me ID

module.exports = router;
