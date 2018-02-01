const assert = require('assert');
const User = require('../src/user');

// test suite for reading users from our database
describe('Reading users out of the database', () => {

  let joe, maria, alex, zach;
  
  // before each test runs we want to create a few users
  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    // Promise.all is a native ES6 function which will take an array of promises and return them as one single promise once all the promises have been resolved
    // NOTE: it is not guaranteed that each record will be saved in order, zach might save before joe.
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
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

  it('find a user with a particular id', (done) => {
    // User.findOne is another class level function.  This time finding one particular record based on the object passed in.
    // in this case we are trying to find a user with a specific id
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({}) // find all the users
      .sort({ name: 1 })  // sort the users by the name property in ascending order
      .skip(1)    // skip the first one
      .limit(2)   // then limit the result set to 2 users, so ( -Alex- [Joe Maria] Zach )
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });

});