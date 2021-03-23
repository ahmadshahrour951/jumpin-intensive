const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  },
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

db.users = require('./user.model')(sequelize, Sequelize);
db.games = require('./game.model')(sequelize, Sequelize);

/////////////////////////////////////////////////////////////////////////////////////////
// Relationships
/////////////////////////////////////////////////////////////////////////////////////////
db.users.hasMany(db.games);
db.games.belongsTo(db.users);

db.users.belongsToMany(db.games, {
  through: 'user_games',
});
db.games.belongsToMany(db.users, {
  through: 'user_games',
});

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
