const { Category } = require('../models');

const insert = (name) => Category.create({ name });

const findAll = () => Category.findAll();

module.exports = { insert, findAll };