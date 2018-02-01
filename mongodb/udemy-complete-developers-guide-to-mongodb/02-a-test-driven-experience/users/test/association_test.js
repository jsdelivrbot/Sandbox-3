const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {

  let joe, blogPost, comment;
  beforeEach((done) => {
    // at this point we create each individual variable there is no association between them at this point
    joe = new User({ name: 'Joe'} );
    blogPost = new BlogPost({ title: 'JS is Great', content: 'It sure is' });
    comment = new Comment({ content: 'Congratulations on a great post!' });

    // create the associations - currently none of this is persisted to the database just yet
    // here it looks like we're pushing the entire object onto the users blogPosts array.
    // however, mongoose does some magic and knows that the blogPosts collection on a user is of type ObjectId and references the blogPost so that is how it will be setup.
    joe.blogPosts.push(blogPost);
    // same with the comments on the blogPost - comments is an array and mongoose will handle this
    blogPost.comments.push(comment);
    // here the same thing happens although a comment only has one user
    comment.user = joe;

    // Promise.all is a native ES6 function which will take an array of promises and return them as one single promise once all the promises have been resolved.
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      // here we have added .populate() and passed the property name we want to populate (we can pass multiple property names seperated by a comma)
      // this will get all the data for the property based on the reference in our user model, so here we will get all the blogPost information rather than just the array of ObjectId's if we didn't use the .populate()
      // NOTE at this point we will not get all the comments associated with each blogPost
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  // it.only will run only this test even if there are hundreds of tests.
  // useful for testing one thing in isolation
  //
  // it.only('run only this test', () => {
  //
  // });

  it('saves a full relation graph - blogPosts, user and comments', (done) => {
    User.findOne({ name: 'Joe' })
      // in this example we use populate to deeply get all of our data
      // we pass an object to it and multiple paths
      // the 'model' property tells mongoose to base the path off of the model value, for example comment or user
      // NOTE: be careful not to overdo the amount of associations we want from mongoose, this can have a negative performance impact
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congratulations on a great post!');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });

});