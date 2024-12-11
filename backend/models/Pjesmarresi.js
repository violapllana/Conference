const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Item = require('./item'); // Import Item before defining Pjesmarresi

const Pjesmarresi = sequelize.define('Pjesmarresi', {
  Pjesmarresi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,  // Reference to Item model
      key: 'id',    // Correct key for Item model
    }
  },
});

// Define relationship after models are loaded
Pjesmarresi.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = Pjesmarresi;
