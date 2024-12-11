const Post = require('../models/post');

// Krijimi i një postimi të ri
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json({ message: 'Postimi u krijua me sukses', post: newPost });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e postimit', error: err });
  }
};

// Marrja e të gjitha postimeve
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e postimeve', error: err });
  }
};

// Përditësimi i një postimi ekzistues

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [updated] = await Post.update({ title, content }, { where: { id: req.params.id } });

    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id);
      res.status(200).json({ message: 'Postimi u përditësua me sukses', post: updatedPost });
    } else {
      res.status(404).json({ message: 'Postimi nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e postimit', error: err });
  }
};

// Fshirja e një postimi

const deletePost = async (req, res) => {
  try {
    console.log('Marrja e kërkesës DELETE për postimin me ID:', req.params.id);  // Shtimi i log-ut për debugging

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postimi nuk u gjet' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Postimi u fshi me sukses', post: post });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e postimit', error: err });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
