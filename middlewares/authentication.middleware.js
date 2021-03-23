const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////////////
// Authentication by verifying JWT token and passing payload to the rest of application
/////////////////////////////////////////////////////////////////////////////////////////
const authenticate = (req, res, next) => {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null)
    return res.redirect('/auth/login');

  const token = req.cookies.nToken;
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.redirect('/auth/login');
  }

  if (!decodedToken) {
    return res.redirect('/auth/login');
  }

  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  next();
};

module.exports = authenticate;
