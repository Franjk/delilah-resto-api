const { Op } = require('sequelize');
const { Pedido, Producto, PedidoProducto } = require('../models');
const sequelize = require('../db/connection');

exports.create = async (req, res) => {
  const usuarioId = 1;
  const {
    formaDePago, productos,
  } = req.body;

  const query = {};
  query.where = { id: { [Op.in]: productos.map((el) => el.id) } };

  const t = await sequelize.transaction();

  try {
    const productosData = await Producto.findAll(query);
    // if (productosData.length !== productos.length) throw new Error('Id de producto invalida');

    let total = 0;
    productosData.forEach((pd) => {
      const producto = productos.find((el) => el.id === pd.id);
      producto.precio = pd.precio;
      producto.nombre = pd.nombre;
      total += pd.precio * producto.cantidad;
    });

    const newPedido = await Pedido.create({
      formaDePago, usuarioId, precio: total,
    }, { transaction: t });

    const pedidoId = newPedido.id;
    const productosCreate = productos.map((el) => ({
      pedidoId, productoId: el.id, cantidad: el.cantidad, precio: el.precio,
    }));
    await PedidoProducto.bulkCreate(productosCreate, { transaction: t });

    await t.commit();

    newPedido.dataValues.productos = productos;
    res.status(201).send(newPedido);
  } catch (err) {
    await t.rollback();
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, nombre, descripcion, imagen, precio, minPrecio, maxPrecio,
  } = req.query;
  const query = {};
  const where = {};

  if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
  if (descripcion) where.descripcion = { [Op.like]: `%${descripcion}%` };
  if (imagen) where.imagen = { [Op.like]: `%${imagen}%` };

  if (minPrecio) where.precio = { [Op.gte]: minPrecio };
  if (maxPrecio) where.precio = { [Op.lte]: maxPrecio };
  if (minPrecio && maxPrecio) where.precio = { [Op.gte]: minPrecio, [Op.lte]: maxPrecio };
  if (precio) where.precio = precio;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

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

  try {
    const producto = await Pedido.findOne(query);
    if (producto) {
      res.send(producto);
    } else {
      res.send({ error: `Producto ${id} no encontrado` });
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
      res.send({ message: `Producto ${id} eliminado` });
    } else {
      res.send({ error: `Producto ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    nombre, descripcion, imagen, precio,
  } = req.body;
  const query = {};

  query.where = { id };

  try {
    const updateCount = await Pedido.update({
      nombre, descripcion, imagen, precio,
    }, query);

    if (updateCount) {
      res.send({ message: `Producto ${id} actualizado` });
    } else {
      res.send({ error: `Producto ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
