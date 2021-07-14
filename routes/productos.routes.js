const express = require('express');
const productosController = require('../controllers/productos.controller');
const authorize = require('../middlewares/authorizer');

const router = express.Router();

router.post('/', authorize(), productosController.create);

router.get('/', authorize('CLIENTE'), productosController.readAll);

router.get('/:id', authorize('CLIENTE'), productosController.readOne);

router.put('/:id', authorize(), productosController.update);

router.delete('/:id', authorize(), productosController.delete);

module.exports = router;
