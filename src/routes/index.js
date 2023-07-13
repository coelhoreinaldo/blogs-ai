const express = require('express');
const login = require('../controllers/login');
const createUser = require('../controllers/userController');

const route = express.Router();

route.post('/login', login);
route.post('/user', createUser);

module.exports = route;