// test that we can create a new user in the database

const assert = require('assert');
const User = require('../src/user');

// the describe function holds a block of tests
// here we will have tests which are about creating records
describe('Creating records', () => {

  // each test is created in an 'if' function
  // the string 'saves a users' explains what the test is doing
  // inside each 'it' function we will have an assertion to check whether values are as we expect
  it('saves a user', (done) => {
    // create the user
    const joe = new User({ name: 'Joe' });

    // save the user
    joe.save()
      .then(() => {
        // has Joe been saved successfully?
        // the isNew boolean property is specific to mocha.
        // it will be true when the model instance 'joe' is waiting to be saved by mocha.
        // once it is saved in the database, the isNew property becomes false.  So here if it is false, then it is saved.
        assert(!joe.isNew);
        done();
      });
  });
});