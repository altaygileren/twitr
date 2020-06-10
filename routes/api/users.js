const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Create
// @route   POST api/users
// @desc    Create a User
// @access  Public
router.post('/', async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;

  if (!email || !username || !firstName || !lastName || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const userEmail = await User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User email already exists' });
    });
  const userName = await User.findOne({ username })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'Username already exists' })
    });
  if (!userEmail || !userName) {
    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      password
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    posts: []
                  }
                })
              }
            )
          })
      })
    })
  };
});

// Read
// @route   GET api/users
// @desc    Get all Users
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
// @route   DELETE api/users
// @desc    Delete a User
// @access  Public
router.delete('/:id', (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .catch(err => res.status(404));

  res.send('The Item was deleted');

});

module.exports = router;
