const express = require('express');
const pedidosController = require('../controllers/pedidos.controller');
const authorize = require('../middlewares/authorizer');

const router = express.Router();

router.post('/', authorize('CLIENTE'), pedidosController.create);

router.get('/', authorize('CLIENTE'), pedidosController.readAll);

router.get('/:id', authorize('CLIENTE'), pedidosController.readOne);

router.put('/:id', authorize(), pedidosController.update);

router.delete('/:id', authorize(), pedidosController.delete);

module.exports = router;
