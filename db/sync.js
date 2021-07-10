const sequelize = require('./connection');
require('../models/Usuario');
require('../models/Producto');

// options: { force: true } | { alter: true }
async function sync(options) {
  await sequelize.sync(options);
  console.log('Database synched');
}

module.exports = sync;
