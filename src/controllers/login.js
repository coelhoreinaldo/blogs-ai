const { userService } = require('../services');
const { generateToken } = require('../auth/authFunctions');

// const validateBody = (body) =>
//   Joi.object({
//     email: Joi.string().required().messages({
//       'string.empty': 'Some required fields are missing',
//       'any.required': 'Some required fields are missing',
//     }),
//     password: Joi.string().required().messages({
//       'string.empty': 'Some required fields are missing',
//       'any.required': 'Some required fields are missing',
//     }),
//   }).validate(body);

const login = async (req, res) => {
  const { body } = req;
  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const { email, password } = body;
  const userEmail = await userService.getByEmail(email);

  if (!userEmail || userEmail.password !== password) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }

  const { password: _password, ...userWithoutPassword } = userEmail.dataValues;

  const payload = userWithoutPassword;

  const token = generateToken(payload);

  return res.status(200).json({ token });
};

module.exports = login;