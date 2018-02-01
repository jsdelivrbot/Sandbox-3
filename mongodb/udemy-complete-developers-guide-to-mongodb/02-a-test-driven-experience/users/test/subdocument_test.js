const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      // by adding the posts property we can set the value to an array of objects which match the post schema, at this point the object will have a title property
      posts: [{ title: 'Post Title' }] 
    });

    // we can call save as we have done previously and the user will be saved with a posts property containing a list of objects with a title property
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => { 
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  // this test creates a record and then adds a subdocument to the user
  it('can add subdocuments to an existing record', (done) => {
    // create the user with an empty collection of posts
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    // save the user
    joe.save()
      // retrieve the user from the db
      .then(() => User.findOne({ name: 'Joe' }))
      // add a post to the array and save the record
      .then((user) => {
        user.posts.push({ title: 'New Post' });

        // we explicitly return a promise from user.save() here because we are using a fat-arrow function with curly braces so we dont have the implicitly returned promise like we do above
        return user.save();
      })
      // find the user again and check that the post is there
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('it can remove an existing subdocument', (done) => {
    // similar process to the above test
    // create a user, save it, fetch it, remove the post, save the parent record, fetch it, and assert that the post is removed.
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        // previously calling .remove() removed the record from the database
        // calling .remove on a subdocument will not remove the record from the database - we have to call .save() on the parent record
        user.posts[0].remove();

        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });

});