const moment = require('moment');
const db = require('../models');
const gameController = {
  createGame,
  findGames,
};

function createGame(req, res, next) {
  if (req.method === 'GET') {
    return res.render('game-create');
  }
  req.body.starts_at = new Date(req.body.starts_at).toISOString();
  req.body.ends_at = new Date(req.body.ends_at).toISOString();

  db.games
    .create(req.body)
    .then(() => res.redirect('/games'))
    .catch((err) => console.log(err));
}

function findGames(req, res, next) {
  db.games
    .findAll({ raw: true })
    .then((games) => {
      return res.render('home', { games });
    })
    .catch((err) => console.log(err));
}
