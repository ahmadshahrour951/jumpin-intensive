const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/signup', authController.signup);
router.post(
  '/signup',
  authController.validate('signup'),
  authController.signup
);
router.get('/login', authController.login);
router.post('/login', authController.validate('login'), authController.login);
router.get('/logout', authController.logout);

module.exports = router;
