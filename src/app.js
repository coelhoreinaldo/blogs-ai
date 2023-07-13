const express = require('express');
const middlewares = require('./middlewares');
const apiRoutes = require('./routes');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use(apiRoutes);
app.use(middlewares.error);

module.exports = app;
