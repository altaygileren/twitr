require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Create
// @route   POST api/auth
// @desc    Login
// @access  Public
router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please make sure to fill in all fields' });
  }

  User.findOne({ username })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      bcrypt.compare(password, user.password)
        .then(passwordMatch => {
          if (!passwordMatch) return res.status(400).json({ msg: 'Password incorrect' })

          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.namne,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  comments: user.comments
                }
              })
            }
          )
        })
    })
});

// Get
// @route   GET api/auth/user
// @desc    Get user
// @access  Private
router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;