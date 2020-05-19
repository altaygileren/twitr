const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


// Create
// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/', (req, res) => {
  const newPost = new Post({
    twit: req.body.twit
  });
  newPost
    .save()
    .then(post => res.json(post));
});

// Read
// @route   GET api/posts
// @desc    Get all Posts
// @access  Public
router.get('/', (req, res) => {
  Post
    .find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});

// Update


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
