const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const PedidoProducto = sequelize.define('pedidoProducto', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'PedidosProductos',
  timestamps: false,
});

module.exports = PedidoProducto;
