const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
const cors = require('cors');
// Routes
const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const comments = require('./routes/api/comments');
const auth = require('./routes/api/auth');
// Body Parser middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Database
const db = process.env.mongoURI

// Connect to Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Database has been connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/users/auth', auth);

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server has started on ${port}`))