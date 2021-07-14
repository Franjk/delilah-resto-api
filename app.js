require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const sync = require('./db/sync');
const routes = require('./routes');
const authenticator = require('./middlewares/authenticator');

const { NODE_ENV, PORT } = process.env;

if (NODE_ENV === 'development') sync({ force: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/auth', routes.auth);
app.use('/usuarios', authenticator, routes.usuarios);
app.use('/productos', authenticator, routes.productos);
app.use('/pedidos', authenticator, routes.pedidos);

app.listen(PORT || 4000, () => {
  console.log(`App listening on port ${PORT || 4000}`);
});
