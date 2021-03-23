const { body } = require('express-validator')
const moment = require('moment');

const db = require('../models');

const gameController = {
  validate,
  createGame,
  findGames,
  findGame,
  updateGame,
  deleteGame,
  joinSelfGame,
  removeSelfGame,
};

////////////////////////////////////////////////////////////////////////////////////////
// Validate middleware for form santization (ideally should be in middlewares directory)
/////////////////////////////////////////////////////////////////////////////////////////
function validate(method) {
  switch (method) {
    case 'createGame':
      return [
        body('name').exists().notEmpty().isString().trim(),
        body('description').optional().isString().trim(),
        body('startsAt').exists().notEmpty().isDate(),
        body('endsAt').exists().notEmpty().isDate()
      ];
    case 'updateGame':
      return [
        body('name').optional().isString().trim(),
        body('description').optional().isString().trim(),
        body('startsAt').optional().isDate(),
        body('endsAt').optional().isDate(),
      ];
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// Get & Post controller handler to create a game
/////////////////////////////////////////////////////////////////////////////////////////
function createGame(req, res, next) {
  if (req.method === 'GET') {
    return db.users
      .findByPk(req.userId)
      .then((user) => {
        return res.render('game-create', {
          user: JSON.parse(JSON.stringify(user)),
        });
      })
      .catch((err) => {
        next(err)
      });
  }

  let newGame = req.body;
  let gameOwner;

  newGame.startsAt = new Date(newGame.startsAt).toISOString();
  newGame.endsAt = new Date(newGame.endsAt).toISOString();

  db.users
    .findByPk(req.userId)
    .then((user) => {
      gameOwner = user;
      return user.createGame(newGame);
    })
    .then((game) => {
      return game.addUser(gameOwner);
    })
    .then(() => res.redirect('/games'))
    .catch((err) => {
      next(err)
    });
}

////////////////////////////////////////////////////////////////////////////////////////
// Get controller handler to find all games created
/////////////////////////////////////////////////////////////////////////////////////////
function findGames(req, res, next) {
  let gamesJson;
  db.games
    .findAll({
      attributes: ['id', 'name', 'startsAt'],
      include: {
        model: db.users,
        attributes: ['id', 'username'],
      },
    })
    .then((games) => {
      gamesJson = JSON.parse(JSON.stringify(games));
      gamesJson.map((x) => {
        x.startsAt = moment(x.startsAt).format(
          'dddd, MMM Do, YYYY [at] hh:mm A'
        );
        return x;
      });

      return db.users.findByPk(req.userId);
    })
    .then((user) => {
      const userJson = JSON.parse(JSON.stringify(user));
      return res.render('games-index', {
        games: gamesJson,
        user: userJson,
      });
    })
    .catch((err) => {
      next(err)
    });
}

////////////////////////////////////////////////////////////////////////////////////////
// Get controller handler to find one specific game
/////////////////////////////////////////////////////////////////////////////////////////
function findGame(req, res, next) {
  let currentGame;
  let currentUser;

  db.users
    .findByPk(req.userId)
    .then((user) => {
      currentUser = JSON.parse(JSON.stringify(user));
      return db.games.findByPk(req.params.gameId, {
        include: {
          model: db.users,
          attributes: ['id', 'username'],
        },
      });
    })
    .then((game) => {
      currentGame = JSON.parse(JSON.stringify(game));
      currentGame.startsAt = moment(currentGame.startsAt).format(
        'dddd, MMM Do, YYYY [at] hh:mm A'
      );
      currentGame.endsAt = moment(currentGame.endsAt).format(
        'dddd, MMM Do, YYYY [at] hh:mm A'
      );

      return game.getUsers();
    })
    .then((users) => {
      const isCreator = currentGame.userId === req.userId;
      const isJoined = users.map((x) => x.id).includes(req.userId);

      return res.render('game-detail', {
        game: currentGame,
        user: currentUser,
        users: JSON.parse(JSON.stringify(users)),
        isJoined,
        isCreator,
      });
    })
    .catch((err) => {
      next(err)
    });
}

////////////////////////////////////////////////////////////////////////////////////////
// Get & Post controller handler to update a game (only by creator)
/////////////////////////////////////////////////////////////////////////////////////////
function updateGame(req, res, next) {
  if (req.method === 'GET') {
    let currentUser;

    return db.users
      .findByPk(req.userId)
      .then((user) => {
        currentUser = JSON.parse(JSON.stringify(user));
        return db.games.findByPk(req.params.gameId);
      })
      .then((game) => {
        const gameJson = JSON.parse(JSON.stringify(game));
        gameJson.startsAt = moment(gameJson.startsAt).format(
          'YYYY-MM-DDThh:mm'
        );
        gameJson.endsAt = moment(gameJson.endsAt).format('YYYY-MM-DDThh:mm');

        return res.render('game-edit', {
          game: gameJson,
          user: currentUser,
        });
      })
      .catch((err) => {
        next(err)
      });
  }

  return db.games
    .findByPk(req.params.gameId)
    .then((game) => {
      return game.update(req.body);
    })
    .then(() => {
      return res.redirect(`/games/${req.params.gameId}`);
    })
    .catch(err => {
      next(err)
    })
}

////////////////////////////////////////////////////////////////////////////////////////
// Delete controller handler to delete a game (only be creator)
/////////////////////////////////////////////////////////////////////////////////////////
function deleteGame(req, res, next) {
  db.games
    .findByPk(req.params.gameId)
    .then((game) => {
      return game.destroy();
    })
    .then(() => {
      return res.status(200).json({
        data: {
          redirect: true,
          redirect_url: '/games',
        },
      });
    })
    .catch(err => {
      next(err)
    })
}

////////////////////////////////////////////////////////////////////////////////////////
// Get route (it should be a post though) to make a user join a game
/////////////////////////////////////////////////////////////////////////////////////////
function joinSelfGame(req, res, next) {
  let currentUser;

  db.users
    .findByPk(req.userId)
    .then((user) => {
      currentUser = user;
      return db.games.findByPk(req.params.gameId);
    })
    .then((game) => {
      return game.addUser(currentUser);
    })
    .then(() => {
      return res.redirect(`/games/${req.params.gameId}`);
    })
    .catch((err) => {
      next(err)
    });
}

////////////////////////////////////////////////////////////////////////////////////////
// Get route (it should be a post though) to make a user leave a game
/////////////////////////////////////////////////////////////////////////////////////////
function removeSelfGame(req, res, next) {
  let currentUser;

  db.users
    .findByPk(req.userId)
    .then((user) => {
      currentUser = user;
      return db.games.findByPk(req.params.gameId);
    })
    .then((game) => {
      return game.removeUser(currentUser);
    })
    .then(() => {
      return res.redirect(`/games/${req.params.gameId}`);
    })
    .catch((err) => {
      next(err)
    });
}

module.exports = gameController;
