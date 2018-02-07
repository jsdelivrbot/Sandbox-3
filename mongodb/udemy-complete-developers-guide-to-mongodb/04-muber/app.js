const express = require('express');
const routes = require('./routes/routes');
const app = express();

// routes() is a function (created by me) to handle our routes, such as app.get('/api)
routes(app);

module.exports = app;
