var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require('../models/user');

var PostsController = {
  Index: function(req, res) {
    if(!req.cookies.name){ res.redirect('/sign-in'); }
    Post.find().sort({createdAt: -1 }).exec(function(err, posts) {
      if (err) { throw err; }
      var currentUser = req.cookies.name;
      res.render('posts/index', { posts: posts, currentUser: currentUser});
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.createdAt = new Date();
    post.likes = 0;
    post.author = req.cookies.name;
    if(req.file !== undefined){post.imagePath = req.file.path;}
    post.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  },

  Like: function(req, res) {
    Post.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}, $push: {likedBy: req.cookies.name}}, function (err) {
    });
    res.status(201).redirect('/posts');
  },

  Comment: function(req, res) {
    var comment = new Comment();
    console.log(req.body);
    comment.comment = req.body.comment;
    comment.createdAt = new Date();
    comment.author = req.cookies.name;
    comment.postId = req.params.id;
    Post.findByIdAndUpdate(req.params.id, {$push: {comment: comment }}, function (err) {
    });
    res.status(201).redirect('/posts');
  },

  Search: function(req, res) {
    let pattern = req.body.keywords;
    User.find({username: new RegExp(pattern, 'i')}, function(err, foundUsers){
      if (err) { throw err }
      res.status(201).render('posts/search', { foundUsers : foundUsers });
    });
  },
};

module.exports = PostsController;
