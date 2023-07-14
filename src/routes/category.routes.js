const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateToken, categoryController.insert);
router.get('/', middlewares.validateToken, categoryController.findAll);

module.exports = router;
