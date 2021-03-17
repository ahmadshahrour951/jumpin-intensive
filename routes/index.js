const express = require('express');
const router = express.Router();

const authentication = require('../middlewares/authentication.middleware');

const authRoutes = require('./auth.route')
// const userRoutes = require('./user.route');
const gameRoutes = require('./game.route');

router.use('/auth', authRoutes)
// router.use('/users', userRoutes);
router.use('/games', authentication, gameRoutes);

module.exports = router;