const express = require('express');
const router = express.Router();

const userRoutes = require('./user.route');
const gameRoutes = require('./game.route');

router.use('/games', gameRoutes);
router.use('/users', userRoutes);

module.exports = router;