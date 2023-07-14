const { categoriesService } = require('../services');

const insert = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { name } = req.body;
  const newCategory = await categoriesService.insert(name);
  return res.status(201).json(newCategory);
};

module.exports = { insert };