const express = require('express');
const router = express.Router();

const authorization = require('../middlewares/authorization.middleware');
const gameController = require('../controllers/game.controller');

router.get('/new', gameController.createGame);
router.post(
  '/new',
  gameController.validate('createGame'),
  gameController.createGame
);

router.get('/:gameId/join', gameController.joinSelfGame);
router.get('/:gameId/remove', gameController.removeSelfGame);

router.get(
  '/:gameId/edit',
  authorization.canEditGame,
  gameController.updateGame
);
router.post(
  '/:gameId/edit',
  authorization.canEditGame,
  gameController.validate('updateGame'),
  gameController.updateGame
);

router.get('/:gameId', gameController.findGame);
router.get('/', gameController.findGames);

router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
