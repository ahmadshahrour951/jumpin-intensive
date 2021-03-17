const moment = require('moment');
const db = require('../models');
const gameController = {
  createGame,
  findGames,
  findGame,
  updateGame,
  deleteGame,
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

function findGame(req, res, next) {
  db.games.findByPk(req.params.gameId, { raw: true }).then((game) => {
    game.starts_at = moment(game.starts_at).format('YYYY-MM-DDThh:mm');
    game.ends_at = moment(game.ends_at).format('YYYY-MM-DDThh:mm');

    console.log(game);

    return res.render('game-detail', { game });
  });
}

function updateGame(req, res, next) {
  db.games
    .findByPk(req.params.gameId)
    .then((game) => {
      return game.update(req.body);
    })
    .then(() => {
      return res.redirect(`/games/${req.params.gameId}`);
    });
}

function deleteGame(req, res, next) {
  db.games
    .findByPk(req.params.gameId)
    .then((game) => {
      return game.destroy();
    })
    .then(() => {
      return res
        .status(200)
        .json({ data:{
          redirect: true,
          redirect_url: '/games'
        } });
    });
}

module.exports = gameController;
