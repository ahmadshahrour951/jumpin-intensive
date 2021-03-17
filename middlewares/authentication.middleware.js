const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  if (
    typeof req.cookies.nToken === 'undefined' ||
    req.cookies.nToken === null
  ) {
    const error = new Error('Not authenticated.');
    req.userId = null;
    next(error)
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.userId = decodedToken.payload;
  }
  next();
};

module.exports = authenticate;