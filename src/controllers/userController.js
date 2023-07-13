const Joi = require('joi');
const { userService } = require('../services');
const { generateToken } = require('../auth/authFunctions');

const validateBody = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'any.required': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': '"email" must be a valid email',
      'any.required': '"email" must be a valid email',
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
      'string.empty': '"password" length must be at least 6 characters long',
      'any.required': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(body);

const createUser = async (req, res, next) => {
  const { error } = validateBody(req.body);
  if (error) return next(error);
  const { body } = req;
  const userEmail = await userService.getByEmail(body.email);
  if (userEmail) { return res.status(409).json({ message: 'User already registered' }); }
  if (!body.image) {
    body.image = null;
  }
  console.log(body);
  userService.createUser(body);

  const { password: _password, ...userWithoutPassword } = req.body;
  const payload = { data: userWithoutPassword };
  const token = generateToken(payload);

  return res.status(201).json({ token });
};

module.exports = createUser;