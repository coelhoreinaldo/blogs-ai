const { getPayload } = require('../auth/authFunctions');

const secret = process.env.JWT_SECRET;

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

const validateToken = async (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      const err = new Error('Token not found');
      err.statusCode = 401;
      return next(err);
    }
    const token = extractToken(bearerToken);
    const { data } = getPayload(token, secret);
    req.body = data;
    return next();
  } catch (err) {
    err.statusCode = 401;
    err.message = 'Expired or invalid token';
    return next(err);
  }
};

module.exports = validateToken;