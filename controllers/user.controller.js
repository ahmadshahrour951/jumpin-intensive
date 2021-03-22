const db = require('../models');
const userController = {
  // findUsers,
  // findUser,
  updateUser,
  // findJoinedGames,
};

// function findUsers(req, res, next) {
//   db.users.findAll({ raw: true }).then((users) => {
//     return res.render('users-index', { users });
//   });
// }

// function findUser(req, res, next) {
//   db.users
//     .findOne({ where: { username: req.params.username } })
//     .then((user) => {
//       return res.render('user-detail', { user });
//     });
// }

function updateUser(req, res, next) {
  if (req.method === 'GET') {
    return db.users
      .findOne({ where: { username: req.params.username } })
      .then((user) => {
        return res.render('user-edit', {
          user: JSON.parse(JSON.stringify(user)),
        });
      })
      .catch((err) => console.log(err));
  }

  return db.users
    .findOne({ where: { username: req.params.username } })
    .then((user) => {
      return user.update(req.body);
    })
    .then(() => {
      return res.redirect(`/users/${req.params.username}/edit`);
    })
    .catch((err) => console.log(err));
}

// function findJoinedGames(req, res, next) {
//   db.users
//     .findAll({
//       where: {
//         username: req.params.username,
//       },
//       include: {
//         model: db.games,
//         through: { attributes: [] },
//       },
//     })
//     .then((users) => {
//       const games = JSON.parse(JSON.stringify(users[0])).games;
//       res.render('games-participating', { games });
//     })
//     .catch((err) => console.log(err));
// }

module.exports = userController;
