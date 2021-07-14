const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Usuario = sequelize.define('usuario', {
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
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['CLIENTE', 'ADMIN']],
    },
    allowNull: false,
    defaultValue: 'CLIENTE',
  },
}, {
  sequelize,
  tableName: 'Usuarios',
});

module.exports = Usuario;
