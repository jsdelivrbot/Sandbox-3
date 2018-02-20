const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

// use bodyParser middleware on every request so place it before any other requests handled by the routes function
app.use(bodyParser.json());

// routes() is a function (created by me) to handle our routes, such as app.get('/api)
routes(app);

// this middleware is called when an error occurs in our driver_controller route
// specifically when trying to create a driver
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
