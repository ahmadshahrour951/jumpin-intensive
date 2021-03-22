const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// router.get('/', userController.findUsers);
// router.get('/:username', userController.findUser);
router.get('/:username/edit', userController.updateUser);
router.post(
  '/:username/edit',
  userController.validate('updateUser'),
  userController.updateUser
);
// router.get('/:username/games', userController.findJoinedGames)

module.exports = router;
