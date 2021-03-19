const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findUsers);
router.get('/:username', userController.findUser);
router.post('/', userController.updateUser);

module.exports = router;
