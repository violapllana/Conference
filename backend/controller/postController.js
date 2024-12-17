const Post = require('../models/post');

// Krijimi i post-it
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // Rruga e imazhit

    const newPost = await Post.create({ title, content, image });
    res.status(201).json({ message: 'Post u krijua me sukses', post: newPost });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e post-it', error: err.message });
  }
};

// Marrja e të gjithë post-eve
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e post-eve', error: err.message });
  }
};

// Përditësimi i një post-i ekzistues
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const [updated] = await Post.update(
      { title, content, image },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id);
      res.status(200).json({ message: 'Posti u përditësua me sukses', post: updatedPost });
    } else {
      res.status(404).json({ message: 'Posti nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e post-it', error: err.message });
  }
};

// Fshirja e një post-i
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Posti nuk u gjet' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Posti u fshi me sukses', post });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e post-it', error: err.message });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
