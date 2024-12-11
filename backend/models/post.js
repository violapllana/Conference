const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Only import sequelize once

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
    type: DataTypes.STRING, // You can store the image path here
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Post;
