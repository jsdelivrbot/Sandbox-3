/* THE PURPOSE OF THESE EXAMPLES IS NOT NECESSARILY TO SHOW GOOD TESTS.  BUT TO SHOW HOW C.R.U.D METHODS WORK AGAINST WITH A MONGODB DATABASE */

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
  // mongoose will normalise the collection name by lowercasing the collection name when it is saved over to mongodb so our blogPost will become blogpost in mongodb
  const { users, comments, blogposts } = mongoose.connection.collections;
  
  // unfortunately we can't drop all the collections in mongodb in one go so we end up with the sort of callback-doom code here where we have to call the drop method one after the other.  this could take time on large databases.
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
