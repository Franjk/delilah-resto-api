const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Pedido = sequelize.define('Pedido', {
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Nuevo',
  },
  formaDePago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Contado',
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Pedidos',
});

module.exports = Pedido;
