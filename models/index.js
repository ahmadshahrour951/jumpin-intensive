const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

/////////////////////////////////////////////////////////////////////////////////////////
// Models Object
/////////////////////////////////////////////////////////////////////////////////////////
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.games = require('./game.model')(sequelize, Sequelize);
/////////////////////////////////////////////////////////////////////////////////////////
// Relationships
/////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////
// Test database connection
/////////////////////////////////////////////////////////////////////////////////////////
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;