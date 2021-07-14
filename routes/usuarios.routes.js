const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const authorize = require('../middlewares/authorizer');
const usuariosFavoritosRouter = require('./usuariosFavoritos.routes');

const router = express.Router();

router.post('/', authorize(), usuariosController.create);

router.get('/', authorize(), usuariosController.readAll);

router.get('/:id', authorize('CLIENTE'), usuariosController.readOne);

router.put('/:id', authorize('CLIENTE'), usuariosController.update);

router.delete('/:id', authorize('CLIENTE'), usuariosController.delete);

router.use('/:id/favoritos', authorize('CLIENTE'), usuariosFavoritosRouter);

module.exports = router;
