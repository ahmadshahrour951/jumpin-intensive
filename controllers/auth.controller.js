const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');

const authController = {
  validate,
  signup,
  login,
  logout,
};

function validate(method) {
  switch (method) {
    case 'signup':
      return [
        body('email').notEmpty().isString().isEmail(),
        body('username')
          .notEmpty()
          .isString()
          .trim()
          .isLength({ min: 3, max: 20 }),
        body('password')
          .notEmpty()
          .isString()
          .trim()
          .isLength({ min: 3, max: 50 }),
      ];
    case 'login':
      return [
        body('username')
          .notEmpty()
          .isString()
          .trim()
          .isLength({ min: 3, max: 20 }),
        body('password')
          .notEmpty()
          .isString()
          .trim()
          .isLength({ min: 3, max: 50 }),
      ];
  }
}

function signup(req, res, next) {
  if (req.method === 'GET') return res.render('signup');

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('signup', { errors: errors.array() });
  }


  let newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  db.users
    .findOne({ where: { email: newUser.email } })
    .then((userEmail) => {
      if (userEmail) {
        const error = new Error('User with that email already exists.');
        next(error);
      }

      return db.users.findOne({ where: { username: newUser.username } });
    })
    .then((userUsername) => {
      if (userUsername) {
        const error = new Error('User with that username already exists.');
        next(error);
      }
      return bcrypt.hash(newUser.password, 12);
    })
    .then((hashedPw) => {
      newUser.password = hashedPw;
      return db.users.create(newUser);
    })
    .then((savedUser) => {
      const token = jwt.sign(
        {
          userId: savedUser.id,
          username: savedUser.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('nToken', token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.redirect('/games');
    })
    .catch((err) => {
      next(err);
    });
}

function login(req, res, next) {
  if (req.method === 'GET') return res.render('login');

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('login', { errors: errors.array() });
    }

  let oldUser = req.body;
  let password = req.body.password;

  db.users
    .findOne({ where: { username: oldUser.username } })
    .then((userUsername) => {
      if (!userUsername) {
        const error = new Error('No user with that username.');
        error.statusCode = 401;
        next(error);
      }

      oldUser = userUsername;
      return bcrypt.compare(password, userUsername.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        next(error);
      }

      const token = jwt.sign(
        {
          userId: oldUser.id,
          username: oldUser.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('nToken', token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.redirect('/games');
    })
    .catch((err) => {
      next(err);
    });
}

function logout(req, res, next) {
  res.clearCookie('nToken');
  return res.redirect('/auth/login');
}

module.exports = authController;
