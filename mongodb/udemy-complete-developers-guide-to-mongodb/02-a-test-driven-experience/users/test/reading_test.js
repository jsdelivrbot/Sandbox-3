const assert = require('assert');
const User = require('../src/user');

// test suite for reading users from our database
describe('Reading users out of the database', () => {

  let joe;
  
  // before each test runs we want to create a user called Joe.
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with a name of Joe', (done) => {
    // User.find is a class level function which we can use to find all users which match the object passed to it, so here we are looking for all users with a name 'Joe'
    User.find({ name: 'Joe' })
      .then((users) => {
        // it will take some amount of time - and 'users' is a list of the users returned by the query.  it could be empty - it's array-like
        assert(users[0]._id.toString() === joe._id.toString());

        // call the done callback when we're ready to carry on
        done();
      });
  });

});