// models/conference.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

const Conference = sequelize.define('Conference', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Conference;
