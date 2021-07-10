const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Producto = sequelize.define('Usuario', {
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
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Producto', // We need to choose the model name
  tableName: 'Productos',
});

module.exports = Producto;
