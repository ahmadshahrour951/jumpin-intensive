const db = require('../models');

const authorization = {
  canEditGame,
  canEditUser,
};

function canEditGame(req, res, next) {
  return db.games
    .findByPk(req.params.gameId, {
      include: {
        model: db.users,
      },
    })
    .then((game) => {
      if (game.user.id === req.userId) {
        next();
      } else {
        const error = new Error('Unauthorized, you did not create this game.');
        error.statusCode = 403;
        throw error;
      }
    });
};

function canEditUser(req, res, next) {
  if (req.params.username === req.username) {
    next();
  } else {
    const error = new Error('Unauthorized, you can only edit your profile.');
    error.statusCode = 403;
    throw error;
  }
};

module.exports = authorization;
