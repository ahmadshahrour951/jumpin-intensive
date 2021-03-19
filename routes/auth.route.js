const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.use('/signup', authController.signup);
router.use('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router;