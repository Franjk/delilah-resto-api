const { Op } = require('sequelize');
const {
  Pedido, Producto, PedidoProducto,
} = require('../models');

exports.create = async (req, res) => {
  const {
    estado, formaDePago, pedidoProductos,
  } = req.body;
  let { usuarioId } = req.body;

  if (req.auth.rol === 'CLIENTE') usuarioId = req.auth.id;

  const query = {};
  query.where = { id: { [Op.in]: pedidoProductos.map((el) => el.productoId) } };

  try {
    const productosData = await Producto.findAll(query);

    productosData.forEach((pd) => {
      const pedidoProducto = pedidoProductos.find((el) => el.productoId === pd.id);
      pedidoProducto.precioUnitario = pd.precio;
    });

    const newPedido = await Pedido.create(
      {
        estado, formaDePago, usuarioId, pedidoProductos,
      },
      {
        include: PedidoProducto,
      },
    );

    res.status(201).send(newPedido);
  } catch (err) {
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, estado, formaDePago, total, minTotal, maxTotal,
  } = req.query;
  let { usuarioId } = req.query;

  const query = {};
  const where = {};

  if (req.auth.rol === 'CLIENTE') usuarioId = req.auth.id;

  if (estado) where.estado = { [Op.like]: `%${estado}%` };
  if (formaDePago) where.formaDePago = { [Op.like]: `%${formaDePago}%` };
  if (usuarioId) where.usuarioId = usuarioId;

  if (minTotal) where.precio = { [Op.gte]: minTotal };
  if (maxTotal) where.precio = { [Op.lte]: maxTotal };
  if (minTotal && maxTotal) where.precio = { [Op.gte]: minTotal, [Op.lte]: maxTotal };
  if (total) where.total = total;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);
  query.include = [
    {
      model: PedidoProducto,
      attributes: { exclude: ['pedidoId'] },
    },
  ];

  try {
    const productos = await Pedido.findAll(query);
    res.send(productos);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.readOne = async (req, res) => {
  const { id } = req.params;
  const query = {};

  query.where = { id };
  query.include = [
    {
      model: PedidoProducto,
      attributes: ['cantidad'],
      include: {
        model: Producto,
        attributes: ['id', 'precio', 'nombre'],
      },
    },
  ];

  try {
    const producto = await Pedido.findOne(query);
    if (producto) {
      res.send(producto);
    } else {
      res.send({ error: `Pedido ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    estado, formaDePago,
  } = req.body;
  const query = {};

  query.where = { id };

  try {
    const updateCount = await Pedido.update({
      estado, formaDePago,
    }, query);

    if (updateCount) {
      res.send({ message: `Pedido ${id} actualizado` });
    } else {
      res.send({ error: `Pedido ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const query = {};

  query.where = { id };

  try {
    const deletedCount = await Pedido.destroy(query);
    if (deletedCount) {
      res.send({ message: `Pedido ${id} eliminado` });
    } else {
      res.send({ error: `Pedido ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
