const { UsuarioProducto } = require('../models');

exports.create = async (req, res) => {
  const { productoId } = req.body;
  const { id: usuarioId } = req.params;

  try {
    const newUsuarioProducto = await UsuarioProducto.create({
      productoId, usuarioId,
    });
    res.status(201).send(newUsuarioProducto);
  } catch (err) {
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, productoId,
  } = req.query;
  const { id: usuarioId } = req.params;
  const query = {};
  const where = {};

  if (productoId) where.productoId = productoId;
  if (usuarioId) where.usuarioId = usuarioId;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const productos = await UsuarioProducto.findAll(query);
    res.send(productos);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.readOne = async (req, res) => {
  const { id: usuarioId, productoId } = req.params;
  const query = {};

  query.where = { usuarioId, productoId };

  try {
    const producto = await UsuarioProducto.findOne(query);
    if (producto) {
      res.send(producto);
    } else {
      res.send({ error: `Favorito ${productoId} del usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  const { id: usuarioId, productoId } = req.params;
  const query = {};

  query.where = { usuarioId, productoId };

  try {
    const deletedCount = await UsuarioProducto.destroy(query);
    if (deletedCount) {
      res.send({ message: `Favorito ${productoId} del usuario ${usuarioId} eliminado` });
    } else {
      res.send({ error: `Favorito ${productoId} del usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
