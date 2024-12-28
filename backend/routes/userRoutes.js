
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Endpoints për përdoruesit
router.post('/users', UserController.createUser);    // Krijo përdorues
router.get('/users', UserController.getAllUsers);    // Merr të gjithë përdoruesit
router.get('/users/:id', UserController.getUserById); // Merr përdoruesin sipas ID-së
router.put('/users/:id', UserController.updateUser);  // Përditëso përdoruesin
router.delete('/users/:id', UserController.deleteUser); // Fshi përdoruesin

module.exports = router;
