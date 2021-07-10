const Producto = require('../models/Producto');

async function populate() {
  await Producto.bulkCreate([
    { nombre: 'Pasta', precio: 123.5 },
    { nombre: 'Asado', precio: 256 },
  ]);
}

module.exports = populate;
