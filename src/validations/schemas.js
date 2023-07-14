const Joi = require('joi');

const requiredFieldsMessage = 'Some required fields are missing';

const titleSchema = Joi.string().required().messages({
  'string.empty': requiredFieldsMessage,
  'any.required': requiredFieldsMessage,
});

const contentSchema = Joi.string().required().messages({
  'string.empty': requiredFieldsMessage,
  'any.required': requiredFieldsMessage,
});

const insertPostSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
  categoryIds: Joi.array()
    .items(Joi.number().required())
    .required()
    .messages({
      'string.empty': requiredFieldsMessage,
      'any.required': requiredFieldsMessage,
    }),
});

const updatePostSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
});

module.exports = { insertPostSchema, updatePostSchema };