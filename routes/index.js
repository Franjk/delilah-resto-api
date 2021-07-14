const auth = require('./auth.routes');
const pedidos = require('./pedidos.routes');
const productos = require('./productos.routes');
const usuarios = require('./usuarios.routes');
const usuariosFavoritos = require('./usuariosFavoritos.routes');

module.exports = {
  auth,
  pedidos,
  productos,
  usuarios,
  usuariosFavoritos,
};
