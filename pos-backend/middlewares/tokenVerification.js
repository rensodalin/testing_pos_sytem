const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { User } = require('../models');
const config = require('../config/config');

const isVerifiedUser = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    // Check Authorization header if cookie is not present
    if (!accessToken && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
      throw createHttpError(401, 'Please provide token!');
    }

    const decodedToken = jwt.verify(accessToken, config.accessTokenSecret);
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      throw createHttpError(401, 'User not found!');
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid or expired token!'));
  }
};

module.exports = { isVerifiedUser };
