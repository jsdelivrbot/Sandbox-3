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

});