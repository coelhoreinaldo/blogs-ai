const { getPayload } = require('../auth/authFunctions');

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

const validateToken = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    const err = new Error('Token not found');
    err.statusCode = 401;
    return next(err);
  }
  try {
    const token = extractToken(bearerToken) || bearerToken;
    const payload = getPayload(token);
    req.payload = payload;
    return next();
  } catch (err) {
    err.statusCode = 401;
    err.message = 'Expired or invalid token';
    return next(err);
  }
};

module.exports = validateToken;