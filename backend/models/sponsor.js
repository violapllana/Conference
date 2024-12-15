const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

const Sponsor = sequelize.define('Sponsor', {
  name: {
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
  phone: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, 
});

module.exports = Sponsor;