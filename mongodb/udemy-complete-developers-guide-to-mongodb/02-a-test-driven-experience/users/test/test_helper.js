// initialisation code - connect to the mongodb database

// require mongoose module
const mongoose = require('mongoose');

// when mongoose needs to use a promise, we want to use ES6 promises.
mongoose.Promise = global.Promise;

// connect to the local mongodb instance
// we have to tell mongoose exactly where our database is 'mongodb://localhost/'
// and which database to use							  'users_test'
// before is a hook which will run before once, before anything else happens - here we want to make sure we are connected to mongoose before we run our tests.
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    // do this once i.e. once the connection is open
    .once('open', () => {
      done();
    })
    // do this each time - when mongoose emits an error
    .on('error', (e) => {
      console.warn('Error: ', e);
    });
});

// a hook is a function that gets executed before any test gets executed inside our test suite

// beforeEach is a hook it will run before each test
// each function in mocha can take a done callback function, this essentially says to mocha you can carry on once this done callback function is called.
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
