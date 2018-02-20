const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

// mongoose, express and mocha don't always play nicely together
// so we grab the driver model from mongoose rather than requiring it
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('POST to /api/drivers creates a new driver', (done) => {
    // not the best test because we are only checking whether the number of drivers has increased by 1
    // we should really get the data back from the database and assert that the data is actually what we intended it to be, in this case email = test@test.com
    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')   // make a POST request
        .send({ email: 'test@test.com '})   // send this data with the request
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });

    });
    
  });

  it('PUT to /api/drivers/:id edits an existing driver', (done) => {
    const driver = new Driver({ email: 't@t.com', isDriving: false });

    // save the driver
    driver.save()
      .then(() => {
        // then use supertest to make a PUT request
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ isDriving: true })    // send the new data
          .end(() => {
            // then find the driver and assert that the value for 'driving' has changed
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                assert(driver.isDriving === true);
                done();
              });
          });
      });
  });

  it('DELETE to /api/drivers/:id deletes an existing driver', (done) => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 'test@test.com' })
              .then((driver) => {
                assert(driver === null);
                done();
              })
          });
      })
  });

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seatlle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'miami@test.com');
            done();
          });
      });
  });

});