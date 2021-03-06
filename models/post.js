var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
  likes: Number,
  likedBy: Array,
  comment: Array,
  author: String,
  imagePath: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
