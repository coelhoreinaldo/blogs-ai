const { Category } = require('../models');

const insert = (name) => Category.create({ name });

module.exports = { insert };