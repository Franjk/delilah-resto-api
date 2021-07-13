const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  const query = {};
  const where = {};

  if (username) {
    where.username = username;
  } else if (email) {
    where.email = email;
  } else {
    return res.status(400).send({ error: 'Missing username or password' });
  }

  query.where = where;

  try {
    const user = await Usuario.findOne(query);
    console.log('user', user);
    if (user.password === password) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      return res.send({ token });
    }
    return res.status(403).send({ error: 'Invalid username or password' });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.register = async (req, res) => {
  const {
    username, nombre, telefono, email, direccion, password, rol,
  } = req.body;

  try {
    const newUsuario = await Usuario.create({
      username, nombre, telefono, email, direccion, password, rol,
    });
    res.status(201).send(newUsuario);
  } catch (err) {
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};