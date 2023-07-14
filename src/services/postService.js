const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const insert = async (title, content, userId, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const newBlogPost = await BlogPost.create({
      title, content, userId,
    }, { transaction: t });

    const postCategories = categoryIds.map(async (e) => {
      await PostCategory.create({ postId: newBlogPost.id, categoryId: e }, { transaction: t });
    });
    await Promise.all(postCategories);
    return newBlogPost;
  });

  return result;
};

const findAll = () => BlogPost.findAll({
  include: [{
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  }],
});

module.exports = { insert, findAll };