const express = require('express');
const productosController = require('../controllers/productos.controller');

const router = express.Router();

router.get('/', productosController.readAll);

router.get('/:id', productosController.readOne);

router.post('/', productosController.create);

router.put('/:id', productosController.update);

router.delete('/:id', productosController.delete);

module.exports = router;
