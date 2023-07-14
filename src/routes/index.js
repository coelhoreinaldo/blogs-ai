const express = require('express');
const login = require('../controllers/login');
const { userController, categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const route = express.Router();

route.post('/login', login);

route.post('/user', userController.createUser);
route.get('/user', validateToken, userController.findAll);
route.get('/user/:id', validateToken, userController.findById);

route.post('/categories', validateToken, categoryController.insert);
route.get('/categories', validateToken, categoryController.findAll);

module.exports = route;