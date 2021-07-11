const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');

const router = express.Router();

router.post('/', usuariosController.create);

router.get('/', usuariosController.readAll);

router.get('/:id', usuariosController.readOne);

router.put('/:id', usuariosController.update);

router.delete('/:id', usuariosController.delete);

module.exports = router;
