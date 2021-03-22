const express = require('express');
const router = express.Router();

const authentication = require('../middlewares/authentication.middleware');

const authRoutes = require('./auth.route')
const userRoutes = require('./user.route');
const gameRoutes = require('./game.route');

router.use('/auth', authRoutes)
router.use('/users', authentication, userRoutes);
router.use('/games', authentication, gameRoutes);

router.use((error, req, res, next) => {
  console.log(error)
  res.status(error.statusCode || 500).render('error', { message: error.message || 'Internal Server Error' });
});

router.use((req, res, next) => {
  res.status(404).render('error-404')
})

module.exports = router;