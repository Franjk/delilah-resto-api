const sequelize = require('./connection');
require('../models/Usuario');

// options: { force: true } | { alter: true }
async function sync(options) {
  await sequelize.sync(options);
  console.log('Database synched');
}

module.exports = sync;
