const express = require('express');
const pedidosController = require('../controllers/pedidos.controller');

const router = express.Router();

router.post('/', pedidosController.create);

router.get('/', pedidosController.readAll);

router.get('/:id', pedidosController.readOne);

router.put('/:id', pedidosController.update);

router.delete('/:id', pedidosController.delete);

module.exports = router;
