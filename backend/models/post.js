const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

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
    type: DataTypes.STRING,  // Rruga e imazhit
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Post;
