// models/feedback.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

const Feedback = sequelize.define('Feedback', {
  participantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Participants',
      key: 'id',
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Feedback;
