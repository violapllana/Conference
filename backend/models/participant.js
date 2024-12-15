// models/participant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

const Participant = sequelize.define('Participant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  conferenceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Conferences',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

module.exports = Participant;
