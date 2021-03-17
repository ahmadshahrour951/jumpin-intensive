const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findUsers);
router.get('/:userId', userController.findUser);
router.post('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
