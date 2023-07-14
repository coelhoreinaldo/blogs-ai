const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const findAll = () => User.findAll({ attributes: { exclude: ['password'] } });

const findById = (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const destroy = (id) => User.destroy({ where: { id } });

module.exports = {
  getByEmail, createUser, findAll, findById, destroy,
};
