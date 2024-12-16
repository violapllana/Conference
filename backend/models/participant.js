const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Database connection

const Participant = sequelize.define('Participant', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true, 
      min: 1900, 
      max: new Date().getFullYear(), 
    },
  },
  schedule: {
    type: DataTypes.ENUM('paradite', 'pasdite'), 
    allowNull: false,
  },
}, {
  timestamps: true, 
});

module.exports = Participant;