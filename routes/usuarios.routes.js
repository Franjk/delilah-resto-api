const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', usuariosController.readAll);

router.post('/', usuariosController.create);

router.get('/:id', usuariosController.readOne);

router.put('/:id', usuariosController.update);

router.delete('/:id', usuariosController.delete);

module.exports = router;
