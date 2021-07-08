const sequelize = require('./db/connection');
const Usuario = require('./models/Usuario');

async function testDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');

  const jane = await Usuario.create({ name: 'Jane', favoriteColor: 'red' });
  // Jane exists in the database now!
  console.log(jane instanceof Usuario); // true
  console.log(jane.name); // "Jane"
}

testDb();
