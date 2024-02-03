// routes/news.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NewsItem = require('../models/NewsItem');

// Get all news items
router.get('/', auth, async (req, res) => {
  try {
    const newsItems = await NewsItem.find().sort({ postedOn: -1 });
    res.json(newsItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Mark a news item as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    let newsItem = await NewsItem.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ msg: 'News Item not found' });
    }
    newsItem.read = true;
    await newsItem.save();
    res.json(newsItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a news item from user's dashboard
router.delete('/:id', auth, async (req, res) => {
  try {
    await NewsItem.findByIdAndRemove(req.params.id);
    res.json({ msg: 'News Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
