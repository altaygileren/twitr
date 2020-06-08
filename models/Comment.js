const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Comment
const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    required: true
  },
  twit: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);