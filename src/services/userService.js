const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const findAll = () => User.findAll({ attributes: { exclude: ['password'] } });

module.exports = {
  getByEmail, createUser, findAll,
};
