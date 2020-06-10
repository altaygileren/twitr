const config = require('config');
const jwt = require('jsonwebtoken');
require('dotenv').config();

auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;