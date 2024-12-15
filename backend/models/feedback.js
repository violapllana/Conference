const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Assuming this is your database connection file

const Feedback = sequelize.define('Feedback', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'feedbacks', // Emri i tabelës në bazën e të dhënave
  timestamps: true, // Nëse keni kolonat `createdAt` dhe `updatedAt`
});

module.exports = Feedback;
