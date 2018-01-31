const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done() );
  });

  it('model instance remove', (done) => {
    // call remove to delete the record from the database
    // .remove returns a promise which we call .then
    joe.remove()
      // then try and find the record with the name 'Joe'
      // .findOne returns a promise which we call .then on
      .then(() => User.findOne({ name: 'Joe' }))
      // the user variable returned by .findOne will be null when no record is found using the criteria name: 'Joe'
      // therefore the record is deleted
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // this will remove a bunch of records with some given criteria - we only have one record but the principle is that all records matching will be removed.
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method find and remove', (done) => {
    // find one record and remove it
    // then try to find the record
    // then check whether it was found
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method find one and remove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

});