const express = require('express');
const { postController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateToken, postController.insert);
router.get('/search', middlewares.validateToken, postController.findByQuery);
router.get('/:id', middlewares.validateToken, postController.findById);
router.get('/', middlewares.validateToken, postController.findAll);
router.put('/:id', middlewares.validateToken, postController.update);
router.delete('/:id', middlewares.validateToken, postController.destroy);

module.exports = router;
