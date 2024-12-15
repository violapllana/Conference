// routes/conferenceRoutes.js
const express = require('express');
const router = express.Router();
const {
  createConference,
  getConferences,
  updateConference,
  deleteConference,
} = require('../controller/conferenceController');

// CRUD routes për konferencat
router.post('/', createConference); // Krijo konferencë
router.get('/', getConferences); // Merr të gjitha konferencat
router.put('/:id', updateConference); // Përditëso konferencë me ID
router.delete('/:id', deleteConference); // Fshi konferencë me ID

module.exports = router;
