// const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const UsuarioProducto = sequelize.define('UsuarioProducto', {}, {
  sequelize,
  tableName: 'UsuariosProductos',
  timestamps: false,
});

module.exports = UsuarioProducto;
