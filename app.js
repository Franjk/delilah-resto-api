require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const sync = require('./db/sync');
const routes = require('./routes');
// const authenticator = require('./middlewares/authenticator');

const { NODE_ENV, PORT } = process.env;

if (NODE_ENV === 'development') sync({ force: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/login', routes.login);
app.use('/signup', routes.signup);
app.use('/usuarios', routes.usuarios);
app.use('/productos', routes.productos);

app.listen(PORT || 4000, () => {
  console.log(`App listening on port ${PORT || 4000}`);
});
