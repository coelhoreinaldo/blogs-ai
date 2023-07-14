const Joi = require('joi');
const { postService, categoriesService } = require('../services');

const requiredFieldsMessage = 'Some required fields are missing';
const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required().messages({
      'string.empty': requiredFieldsMessage,
      'any.required': requiredFieldsMessage,
    }),
    content: Joi.string().required().messages({
      'string.empty': requiredFieldsMessage,
      'any.required': requiredFieldsMessage,
    }),
    categoryIds: Joi.array()
      .items(Joi.number().required())
      .required()
      .messages({
        'string.empty': requiredFieldsMessage,
        'any.required': requiredFieldsMessage,
      }),
  }).validate(body);

const validateBodyToUpdate = (body) =>
  Joi.object({
    title: Joi.string().required().messages({
      'string.empty': requiredFieldsMessage,
      'any.required': requiredFieldsMessage,
    }),
    content: Joi.string().required().messages({
      'string.empty': requiredFieldsMessage,
      'any.required': requiredFieldsMessage,
    }),
  }).validate(body);

const insert = async (req, res, next) => {
  const { error } = validateBody(req.body);
  if (error) return next(error);
  const { title, content, categoryIds } = req.body;
  const { data } = req.payload;
  const categories = await categoriesService.findAll();
  const categoriesIdFromDB = categories.map(({ id }) => id);
  const allCategoriesFound = categoryIds.every((id) => categoriesIdFromDB.includes(id));
  if (!allCategoriesFound) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await postService.insert(title, content, data.id, categoryIds);
  return res.status(201).json(newPost);
};

const findAll = async (_req, res) => {
  const posts = await postService.findAll();
  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.findById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(post);
};

const update = async (req, res, next) => {
  const { data } = req.payload;
  const { id } = req.params;
  const post = await postService.findById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.user.id !== data.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const { error } = validateBodyToUpdate(req.body);
  if (error) {
    return next(error);
  }
  const { title, content } = req.body;
  const updatedPost = await postService.update(title, content, post.id);
  return res.status(200).json(updatedPost);
};

module.exports = { insert, findAll, findById, update };