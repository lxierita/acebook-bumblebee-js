var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
  likes: Number
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
