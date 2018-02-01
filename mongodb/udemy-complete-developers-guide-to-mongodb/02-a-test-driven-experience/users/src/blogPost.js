const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // comments property is what links to the comment model
  // each blogPost will have a list of comments (array)
  // internally mongoose will store this as an array of type ObjectId with the 'ref' property being the reference as to what model the object id refers too - in this case comment which we imported from comment.js
  // IMPORTANT the 'ref' property must be spelled the same as how the model is created for example 'Comment' is different to 'comment' - here we've used lowercase
  comments: [{ 
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
