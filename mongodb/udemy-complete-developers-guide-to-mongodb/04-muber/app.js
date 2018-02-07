const express = require('express');

const app = express();

// GET http://localhost:3050/api
app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = app;
