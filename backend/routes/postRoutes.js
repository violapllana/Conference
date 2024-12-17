const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require('../controller/postController');

// Konfigurimi i multer për ruajtjen e imazheve
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Emër unik për çdo imazh
  },
});

const upload = multer({ storage });

// CRUD routes për posts
router.post('/', upload.single('image'), createPost); // Krijo post me imazh
router.get('/', getPosts); // Merr të gjithë post-et
router.put('/:id', upload.single('image'), updatePost); // Përditëso post me ID dhe imazh
router.delete('/:id', deletePost); // Fshi post me ID

module.exports = router;
