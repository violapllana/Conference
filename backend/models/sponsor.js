const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // assuming sequelize connection is in db.js

const Sponsor = sequelize.define('Sponsor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Sponsor;
