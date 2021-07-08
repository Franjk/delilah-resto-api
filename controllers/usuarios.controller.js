const Usuario = require('../models/Usuario');

exports.getAllUsers = (req, res, next) => {
  if (Math.random() > 0.5) {
    res.send('usuarios ok');
  } else {
    next();
  }
};

exports.create = async (req, res) => {
  const { username, password, nombre } = req.body;
  try {
    const newUsuario = await Usuario.create({ username, password, nombre });
    res.status(201).send(newUsuario);
  } catch (err) {
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};
