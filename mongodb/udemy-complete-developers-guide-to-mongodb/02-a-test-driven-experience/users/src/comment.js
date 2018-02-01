const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  // each comment will be associated with one user
  // so here we store an ObjectId which will refer to a user
  // NOTE the lowercase use of user this should be the same as how the model is created in user.js
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
