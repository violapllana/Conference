// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const {
  createParticipant,
  getParticipants,
  updateParticipant,
  deleteParticipant,
} = require('../controller/participantController');

// CRUD routes për pjesmarresit
router.post('/', createParticipant); // Krijo pjesmarres
router.get('/', getParticipants); // Merr të gjithë pjesmarresit
router.put('/:id', updateParticipant); // Përditëso pjesmarres me ID
router.delete('/:id', deleteParticipant); // Fshi pjesmarres me ID

module.exports = router;
