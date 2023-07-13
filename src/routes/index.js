const express = require('express');
const login = require('../controllers/login');
const { userController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const route = express.Router();

route.post('/login', login);
route.post('/user', userController.createUser);

route.get('/user', validateToken, userController.findAll);
route.get('/user/:id', validateToken, userController.findById);

module.exports = route;