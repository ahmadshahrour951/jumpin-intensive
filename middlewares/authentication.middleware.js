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
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      err.statusCode = 500;
      throw err;
    }

    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    next();
  }
};

module.exports = authenticate;