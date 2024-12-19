const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Lidhja me databazën

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
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

module.exports = Item;
