const db = require('../models');
const userController = {
  findUsers,
  findUser,
  updateUser,
};

function findUsers(req, res, next) {
  db.users
  .findAll({ raw: true })
  .then(users => {
    return res.render('users-index', { users })
  })
}

function findUser(req, res, next) {
  db.users
  .findOne({ where: { username: req.params.username}})
  .then(user => {
    return res.render('user-detail', { user })
  })
}

function updateUser(req, res, next) {
  db.users
    .findByPk(req.params.userId)
    .then((user) => {
      return user.update(req.body);
    })
    .then(() => {
      return res.redirect(`/games/${req.params.gameId}`);
    });
}

module.exports = userController;