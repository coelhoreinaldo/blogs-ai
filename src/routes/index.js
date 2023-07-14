const express = require('express');
const loginController = require('../controllers/login');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const postRoutes = require('./post.routes');

const router = express.Router();

router.post('/login', loginController);

router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/post', postRoutes);

module.exports = router;
