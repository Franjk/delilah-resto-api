const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Usuario = sequelize.define('Usuario', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  idRol: {
    type: DataTypes.TEXT,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Usuario', // We need to choose the model name
  tableName: 'Usuarios',
});

module.exports = Usuario;
