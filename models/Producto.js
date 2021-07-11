const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Producto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    unique: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Productos',
});

module.exports = Producto;
