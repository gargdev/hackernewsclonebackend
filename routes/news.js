// routes/news.js

const express = require('express');
const router = express.Router();
const NewsItem = require('../models/NewsItem');

// Get all news items
router.get('/', async (req, res) => {
  try {
    const newsItems = await NewsItem.find();
    res.json(newsItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark a news item as read
router.patch('/:id/read', async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);
    newsItem.read = true;
    await newsItem.save();
    res.json(newsItem);
  } catch (err) {
    res.status(404).json({ message: 'News item not found' });
  }
});

// Mark a news item as deleted
router.patch('/:id/delete', async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);
    newsItem.deleted = true;
    await newsItem.save();
    res.json(newsItem);
  } catch (err) {
    res.status(404).json({ message: 'News item not found' });
  }
});


// app.patch('/api/news/:id/delete', async (req, res) => {
//   try {
//     const newsItem = await NewsItem.findById(req.params.id);
//     newsItem.deleted = true; // Mark as deleted
//     await newsItem.save();
//     res.json(newsItem);
//   } catch (err) {
//     res.status(404).json({ message: 'News item not found' });
//   }
// });

module.exports = router;
