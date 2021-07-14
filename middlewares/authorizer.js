const authorize = (...listaRoles) => (req, res, next) => {
  const { id: userId, rol } = req.auth;
  const { id: paramId } = req.params;

  console.log('listaRoles', listaRoles);
  console.log('data', userId, paramId, rol);

  if (rol === 'ADMIN') return next();

  if (listaRoles.includes(rol)) {
    if (!paramId) return next();
    if (paramId == userId) return next();
  }

  return res.status(403).send({ error: 'No autorizado' });
};

module.exports = authorize;
