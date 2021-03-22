const express = require('express');
const router = express.Router();

const authorization = require('../middlewares/authorization.middleware')
const gameController = require('../controllers/game.controller');

router.use('/new', gameController.createGame);
router.get('/:gameId/join', gameController.joinSelfGame);
router.get('/:gameId/remove', gameController.removeSelfGame);
router.use('/:gameId/edit', authorization.canEditGame, gameController.updateGame);
router.get('/:gameId', gameController.findGame);
router.get('/', gameController.findGames);
router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
