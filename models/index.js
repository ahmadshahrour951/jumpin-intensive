const dbConfig =
  process.env.NODE_ENV === 'production'
    ? require('../config/db.config.js').production
    : require('../config/db.config.js').development;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.db,
  dbConfig.user,
  dbConfig.password,
  dbConfig.options
);

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
