const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const auth = require('../../middleware/auth');

// Create
// @route POST api/comments
// @desc Create comment
// @access Private
router.post('/', auth, async (req, res) => {

  const newComment = new Comment({
    comment: req.body.comment,
    user: req.body.user,
    username: req.body.username,
    twit: req.body.twit
  });
  try {
    const newCommentPosted = await newComment.save();
    const updatePost = await Post.findOneAndUpdate({ _id: req.body.twit }, { $push: { comments: newCommentPosted } })
    if (!updatePost) throw Error('Something went wrong');
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
});

// Read
// @route   GET api/comments
// @desc    Get all Comments
// @access  Public
router.get('/', (req, res) => {
  Comment
    .find()
    .sort({ date: -1 })
    .then(comments => res.json(comments))
    .catch(err => console.log(err));
})

module.exports = router;