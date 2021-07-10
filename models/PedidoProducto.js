const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const PedidoProducto = sequelize.define('PedidoProducto', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'PedidosProductos',
  timestamps: false,
});

module.exports = PedidoProducto;
