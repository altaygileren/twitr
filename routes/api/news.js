const express = require('express');
const router = express.Router();
const axios = require('axios');

// Read
// @route GET api/news
// @desc Get all news articles
// @access Public
router.get('/', async (req, res) => {
  const newsArticles = await axios.get(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
  res.json({ news: newsArticles.data.articles })
})

module.exports = router;