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

const findById = (id) => BlogPost.findOne({
  where: { id },
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

const update = async (title, content, id) => {
  const updatedPostId = await sequelize.transaction(async (t) => {
    const updatedPost = await BlogPost.update(
      {
        title, content,
      },
      {
        where: { id },
      },

      { transaction: t },
    );
    return updatedPost;
  });

  return findById(updatedPostId);
};

const destroy = async (id) => {
  await sequelize.transaction(async (t) => {
    const deleledId = await BlogPost.destroy(
      {
        where: { id },
      },

      { transaction: t },
    );
    return deleledId;
  });
};

module.exports = { insert, findAll, findById, update, destroy };