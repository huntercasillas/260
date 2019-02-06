var mongoose = require('mongoose');

var VotingSchema = new mongoose.Schema({
  Name: String,
  price: String,
  votes: {type: Number, default:0},
  image: String
});

VotingSchema.methods.upvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};

mongoose.model('Voting',VotingSchema);
