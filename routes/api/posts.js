const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

// Create
// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/', auth, async (req, res) => {
  const newPost = new Post({
    twit: req.body.twit,
    user: req.body.user,
    username: req.body.username,
    comments: []
  });
  try {
    const post = await newPost.save();
    if (!post) throw Error('Something went wrong')
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// Read
// @route   GET api/posts
// @desc    Get all Posts
// @access  Public
router.get('/', (req, res) => {
  if (req.query.twits === undefined) {
    Post
      .find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => console.log(err));
  } else {
    let findTwits = new RegExp("^" + req.query.twits.toLowerCase(), "i");
    Post.find({ twit: findTwits })
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => console.log(err));
  }
});

// Delete
// @route   DELETE api/posts
// @desc    Delete a post
// @access  Public
router.delete('/:id', (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .catch(err => res.status(404));

  res.send('The Item was deleted');
});

module.exports = router;
