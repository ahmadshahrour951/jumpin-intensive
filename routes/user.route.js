const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// router.get('/', userController.findUsers);
// router.get('/:username', userController.findUser);
router.use('/:username/edit', userController.updateUser);
// router.get('/:username/games', userController.findJoinedGames)

module.exports = router;
