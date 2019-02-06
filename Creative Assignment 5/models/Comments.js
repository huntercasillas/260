var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title: String,
  url: String,
  owner: String,
  upvotes: {type: Number, default: 0},
  compliments: [],
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CommentSchema.methods.addCompliment = function(cb) {
  this.compliments.push();
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);