const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require('../controller/postController');

// CRUD routes për posts
router.post('/', createPost); // Krijo post
router.get('/', getPosts); // Merr të gjithë post-et
router.put('/:id', updatePost); // Përditëso post me ID
router.delete('/:id', deletePost); // Fshi post me ID

module.exports = router;
