const auth = require('./auth.routes');
const pedidos = require('./pedidos.routes');
const productos = require('./productos.routes');
const usuarios = require('./usuarios.routes');

module.exports = {
  auth,
  pedidos,
  productos,
  usuarios,
};
