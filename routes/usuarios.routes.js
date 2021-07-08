const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');

const router = express.Router();

console.log(usuariosController);

// GET catalog home page.
router.get('/', usuariosController.getAllUsers);

router.post('/', usuariosController.create);

module.exports = router;
