require('dotenv').config();
const { Sequelize } = require('sequelize');

// Krijo instancën e Sequelize për lidhjen me databazën
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Funksioni për të krijuar databazën nëse ajo nuk ekziston
const createDatabase = async () => {
  try {
    // Lidhja me databazën për krijimin e saj
    const connection = new Sequelize(
      '',
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
    
    // Krijo databazën nëse nuk ekziston
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log('Databaza është krijuar ose ekziston.');

    // Autentiko lidhjen me databazën
    await sequelize.authenticate();
    console.log('Lidhja me bazën e të dhënave është e suksesshme.');

    // Krijo tabelat nëse ato nuk ekzistojnë pa i fshirë ato
    await sequelize.sync();
    console.log('Tabela(t) janë krijuar në MySQL.');
  } catch (error) {
    console.error('Gabim gjatë krijimit të databazës ose tabelës:', error);
  }
};

// Krijo databazën dhe inicializo serverin
createDatabase();

module.exports = sequelize;
