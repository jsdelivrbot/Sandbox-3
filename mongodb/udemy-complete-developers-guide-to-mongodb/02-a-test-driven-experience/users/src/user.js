// a model to represent a user

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  // usually in a schema we can give each property a name and a type
  // such as name: String.
  // here we have set some validation that the name is required
  // so to add the extra detail for the field we create an object with its details - so it's type, required etc
  name: {
    type: String,
    // using the validate property we can specify a function to be run to validate a value, in this case name, as it's being passed to the function - it's length should be > 2
    validate: {
      validator: (name) => name.length > 2,
      // the message property is the message we want when the validation fails.
      message: 'Name must be at least 3 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  // the posts property is an embedded document
  // it is an array of type PostSchema which we imported from post.js
  // with this we can say a user can have many posts
  posts: [PostSchema]
});

// create a variable (although here its called a class) which is based on the 'user' collection in the mongodb database we are using - the string 'user' is the collection in the mongodb database.  if it does not exist then it will be created.
// and ensure it adheres to the UserSchema - so we expect the user to have a name of type String etc
// the User variable (or class) represents an entire collection in the database, not just a single user.
const User = mongoose.model('user', UserSchema);

// this is so we can use it in other files in our projects
module.exports = User;
