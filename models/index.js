const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Pedido = require('./Pedido');
const PedidoProducto = require('./PedidoProducto');
const UsuarioProducto = require('./UsuarioProducto');

Pedido.belongsTo(Usuario);
Pedido.belongsToMany(Producto, { through: PedidoProducto });
Producto.belongsToMany(Pedido, { through: PedidoProducto });
Producto.belongsToMany(Usuario, { through: UsuarioProducto });
Usuario.belongsToMany(Producto, { through: UsuarioProducto });

module.exports = {
  Usuario,
  Producto,
  Pedido,
  PedidoProducto,
  UsuarioProducto,
};
