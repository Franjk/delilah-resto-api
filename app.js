require('dotenv').config();
require('./db/sync')({ alter: true });
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/login', routes.login);
app.use('/signup', routes.signup);
app.use('/usuarios', routes.usuarios);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
