const assert = require('assert');
const request = require('supertest');
const app = require('../app'); 

describe('The express app', () => {

  it('handles a GET request to /api', (done) => {
    request(app)    // pass our express app to supertest
      .get('/api')  // make our request, can be PUT etc
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });

});