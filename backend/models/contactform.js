const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the sequelize instance

const ContactForm = sequelize.define('ContactForm', {
  emri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Siguron që formati është email
    },
  },
  mesazhi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  statusi: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // Statusi parazgjedhje
  },
});
module.exports = ContactForm;