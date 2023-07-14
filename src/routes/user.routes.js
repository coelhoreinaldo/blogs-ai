const express = require('express');
const { userController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', middlewares.validateToken, userController.findAll);
router.get('/:id', middlewares.validateToken, userController.findById);
router.delete('/me', middlewares.validateToken, userController.destroy);

module.exports = router;
