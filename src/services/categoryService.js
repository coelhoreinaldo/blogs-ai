const { Category } = require('../models');

const insert = (name) => Category.create({ name });

const findAll = () => Category.findAll();

// const findAndCountAll = async (id) => {
//   const { count } = await Category.findAndCountAll({
//     where: id,
//   });
//   return count;
// };

module.exports = { insert, findAll };