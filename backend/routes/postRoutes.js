const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, deletePost } = require('../controller/postController');

// Krijimi i postimit të ri
router.post('/', createPost);

// Marrja e të gjitha postimeve
router.get('/', getPosts);

// Përditësimi i postimit
router.put('/:id', updatePost);

// Fshirja e postimit
router.delete('/:id', deletePost);

module.exports = router;
