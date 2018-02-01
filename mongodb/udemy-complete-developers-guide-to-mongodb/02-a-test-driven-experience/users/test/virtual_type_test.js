const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

  it('postCount returns number of posts', (done) => {
    // we create a user with the name and posts
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle '}]
    });

    // save the record and fetch it and assert that the virtual type has the correct value
    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then(user => {
        assert(user.postCount === 1);
        done();
      })    
  });

});