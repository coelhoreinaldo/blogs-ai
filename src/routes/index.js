const express = require('express');
const login = require('../controllers/login');
const { userController, categoryController, postController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const route = express.Router();

route.post('/login', login);

route.post('/user', userController.createUser);
route.get('/user', validateToken, userController.findAll);
route.get('/user/:id', validateToken, userController.findById);
route.delete('/user/me', validateToken, userController.destroy);

route.post('/categories', validateToken, categoryController.insert);
route.get('/categories', validateToken, categoryController.findAll);

route.post('/post', validateToken, postController.insert);
route.get('/post', validateToken, postController.findAll);
route.get('/post/:id', validateToken, postController.findById);
route.put('/post/:id', validateToken, postController.update);
route.delete('/post/:id', validateToken, postController.destroy);

module.exports = route;