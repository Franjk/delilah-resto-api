const sequelize = require('./connection');
const populate = require('./populate');
require('../models');

// options: { force: true } | { alter: true }
async function sync(options) {
  await sequelize.sync(options);
  console.log('Database synched');
  if (options.force) populate();
}

module.exports = sync;
