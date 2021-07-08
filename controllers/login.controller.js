const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  let query;

  if (username) {
    query = { username };
  } else if (email) {
    query = { email };
  } else {
    return res.status(400).send({ error: 'Missing username or password' });
  }

  try {
    const user = await Usuario.findOne({
      where: query,
    });
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
