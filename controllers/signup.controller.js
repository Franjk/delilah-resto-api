const Usuario = require('../models/Usuario');

exports.signup = async (req, res) => {
  const {
    username, email, nombre, password,
  } = req.body;

  try {
    const newUser = await Usuario.create({
      username, password, nombre, email,
    });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err); // en el futuro mandar solo el error message
  }
};
