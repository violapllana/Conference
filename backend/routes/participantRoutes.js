const express = require('express');
const router = express.Router();
const {
  createParticipant,
  getParticipants,
  updateParticipant,
  deleteParticipant,
} = require('../controller/participantController');

// CRUD routes for participants
router.post('/', createParticipant); // Create participant
router.get('/', getParticipants); // Get all participants
router.put('/:id', updateParticipant); // Update participant by ID
router.delete('/:id', deleteParticipant); // Delete participant by ID

module.exports = router;
