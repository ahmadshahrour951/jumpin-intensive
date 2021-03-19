const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.controller');

router.use('/new', gameController.createGame);
router.get('/', gameController.findGames);

router.get('/:gameId/join', gameController.joinSelfGame);
router.get('/:gameId/remove', gameController.removeSelfGame);

router.get('/:gameId', gameController.findGame);
router.post('/:gameId', gameController.updateGame);
router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
