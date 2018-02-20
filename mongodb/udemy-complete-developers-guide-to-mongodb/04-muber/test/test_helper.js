const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Error: ', err);
    });
});

beforeEach(done => {
  // drop the driver collection before each test runs
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    // dropping a collection will also remove our index
    // use .ensureIndex to make sure our index exists for geometry.coordinates
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    // the first time the test suite runs, there won't be a drivers collection to drop.
    // so we add a catch statement so we can continue on by calling done()
    .catch(() => done()); 
});
