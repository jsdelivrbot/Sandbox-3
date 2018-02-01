const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

  let joe, blogPost;
  beforeEach((done) => {
    // at this point we create each individual variable there is no association between them at this point
    joe = new User({ name: 'Joe'} );
    blogPost = new BlogPost({ title: 'JS is Great', content: 'It sure is' });

    // create the associations - currently none of this is persisted to the database just yet
    // here it looks like we're pushing the entire object onto the users blogPosts array.
    // however, mongoose does some magic and knows that the blogPosts collection on a user is of type ObjectId and references the blogPost so that is how it will be setup.
    joe.blogPosts.push(blogPost);

    // Promise.all is a native ES6 function which will take an array of promises and return them as one single promise once all the promises have been resolved.
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    // here we simply call remove which will persist the removal to the database
    joe.remove()
      // we can call .count() from the BlogPost model, this will count the records in the database not in memory
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});