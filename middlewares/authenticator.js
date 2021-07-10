const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: "Must provide Authorization header with format: 'Bearer <Token>'" });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      req.user = decoded;
      return next();
    }

    return res.status(401).json({ error: 'Invalid token' });
  } catch (err) {
    return res.status(400).send({ error: 'Invalid token. Token format: "Bearer <token>"' });
  }
};
