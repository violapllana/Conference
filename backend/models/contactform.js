const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ContactForm = sequelize.define('ContactForm', {
  emri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  mesazhi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  statusi: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  }
});

module.exports = ContactForm;