const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require('../controller/itemController');

// CRUD routes for items
router.post('/', createItem); // Create item
router.get('/', getItems); // Get all items
router.put('/:id', updateItem); // Update item by ID
router.delete('/:id', deleteItem); // Delete item by ID

module.exports = router;
