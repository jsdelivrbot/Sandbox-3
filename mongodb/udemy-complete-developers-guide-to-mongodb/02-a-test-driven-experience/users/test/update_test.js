const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  // we're using a function to assert our tests and values
  // doing this simply saves on repetitive code 
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    // we can use the .set method to change a value on our object, for example, the name property
    // importantly at this point this is not saved to the database, only changed on our instance of the User - joe
    joe.set('name', 'Alex');
    assertName(joe.save(), done);

    // by using set and save we can do piecemeal updates by chaning individual values such as name
  });

  it('A model instance can update', (done) => {
    // this test we're using .update on the model instance to update a property, this gets passed as an object
    assertName(joe.update({ name: 'Alex' }), done);

    // by using the .update method we can do bulk update of properties on the model instance based on the object passed to .update
    // for example, { name: 'Alex', age: 21, dob: .... } etc
  });

  it('A model class can update', (done) => {
    // .update on the class User can be called with 2 objects
    // the first object is the criteria to search for, so all users with name 'Joe'
    // the second is the object to change the values to, so change the name property to 'Alex' for all the records found
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    // very similar to above, with the exception that this will find one user and update only that record
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex'}), done);
  });

  it('A model class can find a record by id and update', (done) => {
    // same as above by finding one user by its id then updating it
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('A user can have their likes incremented by 1', (done) => {
    // here we want to increment the number of likes of all records where the user name is 'Joe'
    // we dont want to pull back all the records and iterate over them incrementing the likes and saving the records.  This is not performant.  Instead we use update operators and let MongoDB do the work for us.
    User.update(
      { name: 'Joe' }, 
      // $inc is an update operator to which will increment the likes value by 1 for all the records matched by the object above
      { $inc: { likes: 1 } }
    )
    // then we do an assertion by finding a record and checking the likes value
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.likes === 1);
      done();
    });

    // more info about update operators at
    // https://docs.mongodb.com/manual/reference/operator/update/
  });

  xit('incomplete test using xit', () => {
    // mocha will not run tests which are defined with 'xit' 
    // instead these tests will be ignored, maybe they haven't been implemented yet and are not to be executed.
  });

});