const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Pedido = require('./Pedido');
const PedidoProducto = require('./PedidoProducto');
const UsuarioProducto = require('./UsuarioProducto');

Pedido.belongsTo(Usuario, { foreignKey: { allowNull: false } });
Pedido.belongsToMany(Producto, { through: PedidoProducto });
Pedido.hasMany(PedidoProducto);

Producto.belongsToMany(Pedido, { through: PedidoProducto });
Producto.belongsToMany(Usuario, { through: UsuarioProducto });
Producto.hasMany(PedidoProducto);

PedidoProducto.belongsTo(Producto);

Usuario.belongsToMany(Producto, { through: UsuarioProducto });
Usuario.hasMany(Pedido);

UsuarioProducto.belongsTo(Usuario, { onDelete: 'cascade' });

module.exports = {
  PedidoProducto,
  UsuarioProducto,
  Usuario,
  Producto,
  Pedido,
};
