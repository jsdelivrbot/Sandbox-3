const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // create a driver
  create(req, res) {
    // get the data from the request body
    const driverProps = req.body;

    // create a new driver with the data from the request
    Driver.create(driverProps)
      .then((driver) => res.send(driver));  // then send the driver back in the response
  }
};