const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // create a driver
  create(req, res, next) {
    // get the data from the request body
    const driverProps = req.body;

    // create a new driver with the data from the request
    Driver.create(driverProps)
      .then((driver) => res.send(driver))  // then send the driver back in the response
      .catch(next); // passing next to the .catch method will automatically call .next to move the middleware along
  },

  // edit a driver
  edit(req, res, next) {
    // get the id of the driver we want to update & the details from the request body
    const driverId = req.params.id;
    const driverProps = req.body;

    // find the driver and update its details
    Driver.findByIdAndUpdate(
      { _id: driverId }, 
      driverProps
    )
    // unfortunately, findByIdAndUpdate does not give us the driver object which was updated
    // instead, we get some statistics about which driver was updated
    // so we need to find the driver, then send it in the response
    .then(() => Driver.findById({ _id: driverId }))
    .then((driver) => res.send(driver))
    .catch(next);
  }
};