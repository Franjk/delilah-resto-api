const {
  Producto, Usuario, Pedido, PedidoProducto,
} = require('../models');

async function populate() {
  await Producto.bulkCreate([
    { nombre: 'Pasta', precio: 123.5 },
    { nombre: 'Asado', precio: 256 },
    { nombre: 'Empanadas', precio: 40 },
    { nombre: 'Locro', precio: 450 },
    { nombre: 'Hamburguesa', precio: 600 },
    { nombre: 'Sandwiches', precio: 100 },

  ]);

  await Usuario.bulkCreate([
    {
      username: 'fran', nombre: 'francisco', password: '123', email: 'fran@mail.com', rol: 'admin',
    },
    {
      username: 'fran2', nombre: 'francisco2', password: '123', email: 'fran2@mail.com', rol: 'client',
    },
    {
      username: 'fran3', nombre: 'francisco3', password: '123', email: 'fran3@mail.com', rol: 'client',
    },
    {
      username: 'fran4', nombre: 'francisco4', password: '123', email: 'fran4@mail.com', rol: 'client',
    },
  ]);

  await Pedido.bulkCreate([
    {
      estado: 'NUEVO',
      formaDePago: 'CONTADO',
      total: 552,
      usuarioId: 1,
      pedidoProductos: [
        {
          cantidad: 2,
          precioUnitario: 100,
          productoId: 2,
        },
        {
          cantidad: 1,
          precioUnitario: 40,
          productoId: 3,
        },
      ],
    },
    {
      estado: 'CONFIRMADO',
      formaDePago: 'TARJETA',
      total: 552,
      usuarioId: 1,
      pedidoProductos: [
        {
          cantidad: 2,
          precioUnitario: 256,
          productoId: 2,
        },
        {
          cantidad: 1,
          precioUnitario: 40,
          productoId: 3,
        },
      ],
    },
  ],
  { include: PedidoProducto });
}

module.exports = populate;
