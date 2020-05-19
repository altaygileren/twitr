const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  twit: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);