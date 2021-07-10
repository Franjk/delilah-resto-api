const usuarios = require('./usuarios.routes');
const productos = require('./productos.routes');
const login = require('./login.routes');
const signup = require('./signup.routes');

module.exports = {
  usuarios,
  productos,
  login,
  signup,
};
