const { Op } = require('sequelize');
const { Producto } = require('../models');

exports.create = async (req, res) => {
  const {
    nombre, descripcion, imagen, precio,
  } = req.body;

  try {
    const newProducto = await Producto.create({
      nombre, descripcion, imagen, precio,
    });
    res.status(201).send(newProducto);
  } catch (err) {
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
    const productos = await Producto.findAll(query);
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
    const producto = await Producto.findOne(query);
    if (producto) {
      res.send(producto);
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
    const updateCount = await Producto.update({
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

exports.delete = async (req, res) => {
  const { id } = req.params;
  const query = {};

  query.where = { id };

  try {
    const deletedCount = await Producto.destroy(query);
    if (deletedCount) {
      res.send({ message: `Producto ${id} eliminado` });
    } else {
      res.send({ error: `Producto ${id} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
