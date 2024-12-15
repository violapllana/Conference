<<<<<<< HEAD
// routes/participantRoutes.js
=======
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
const express = require('express');
const router = express.Router();
const {
  createParticipant,
  getParticipants,
  updateParticipant,
  deleteParticipant,
} = require('../controller/participantController');

<<<<<<< HEAD
// CRUD routes për pjesmarresit
router.post('/', createParticipant); // Krijo pjesmarres
router.get('/', getParticipants); // Merr të gjithë pjesmarresit
router.put('/:id', updateParticipant); // Përditëso pjesmarres me ID
router.delete('/:id', deleteParticipant); // Fshi pjesmarres me ID
=======
// CRUD routes for participants
router.post('/', createParticipant); // Create participant
router.get('/', getParticipants); // Get all participants
router.put('/:id', updateParticipant); // Update participant by ID
router.delete('/:id', deleteParticipant); // Delete participant by ID
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568

module.exports = router;
