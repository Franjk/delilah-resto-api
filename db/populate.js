const {
  Producto, Usuario, Pedido, PedidoProducto, UsuarioProducto,
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
      username: 'admin', nombre: 'administrador', password: '123', email: 'admin@mail.com', rol: 'ADMIN',
    },

    {
      username: 'cliente', nombre: 'cliente', password: '123', email: 'cliente@mail.com', rol: 'CLIENTE',
    },

    {
      username: 'fran', nombre: 'francisco', password: '123', email: 'fran@mail.com', rol: 'ADMIN',
    },

    {
      username: 'jose', nombre: 'jose', password: '123', email: 'jose@mail.com', rol: 'CLIENTE',
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
      usuarioId: 2,
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
    {
      estado: 'NUEVO',
      formaDePago: 'CONTADO',
      total: 200,
      usuarioId: 2,
      pedidoProductos: [
        {
          cantidad: 2,
          precioUnitario: 100,
          productoId: 4,
        },
      ],
    },
    {
      estado: 'NUEVO',
      formaDePago: 'CONTADO',
      total: 800,
      usuarioId: 3,
      pedidoProductos: [
        {
          cantidad: 2,
          precioUnitario: 100,
          productoId: 1,
        },
        {
          cantidad: 2,
          precioUnitario: 300,
          productoId: 5,
        },
      ],
    },
  ],
  { include: PedidoProducto });

  await UsuarioProducto.bulkCreate([
    { usuarioId: 1, productoId: 1 },
    { usuarioId: 1, productoId: 2 },
    { usuarioId: 2, productoId: 1 },
    { usuarioId: 2, productoId: 4 },
    { usuarioId: 2, productoId: 6 },
    { usuarioId: 3, productoId: 3 },
    { usuarioId: 4, productoId: 5 },

  ]);
}

module.exports = populate;
