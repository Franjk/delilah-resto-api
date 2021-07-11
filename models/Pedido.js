const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Pedido = sequelize.define('pedido', {
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NUEVO',
    validate: {
      isIn: [['NUEVO', 'CONFIRMADO', 'PREPARANDO', 'ENVIANDO', 'CANCELADO', 'ENTREGADO']],
    },
  },
  formaDePago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Contado',
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Pedidos',
});

module.exports = Pedido;
