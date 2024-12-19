const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Ruaj emrin e skedarit
    allowNull: true,
  },
});

// Hook për të përfshirë rrugën e plotë të imazhit

Post.addHook('afterFind', (posts) => {
  if (Array.isArray(posts)) {
    posts.forEach((post) => {
      if (post.image) {
        post.image = `http://localhost:5000/uploads/${post.image}`;
      }
    });
  } else if (posts && posts.image) {
    posts.image = `http://localhost:5000/uploads/${posts.image}`;
  }
});


module.exports = Post;
