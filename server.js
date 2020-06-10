require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
// Routes
const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const comments = require('./routes/api/comments');
const auth = require('./routes/api/auth');
const news = require('./routes/api/news');
// Body Parser middleware
app.use(cors());
app.use(express.json());

const { createProxyMiddleware } = require('http-proxy-middleware');

// Connect to Mongo
mongoose
  .connect(process.env.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('Database has been connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/users/auth', auth);
app.use('/api/news', proxy)

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server has started on ${port}`))