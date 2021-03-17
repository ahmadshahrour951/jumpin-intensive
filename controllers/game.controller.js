const moment = require('moment');
const db = require('../models');
const gameController = {
  findGames,
};
function findGames(req, res, next) {
  db.games
    .findAll({ raw: true })
    .then((games) => {
      return res.render('home', { games });
    })
    .catch((err) => console.log(err));
}
