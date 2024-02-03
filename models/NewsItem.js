// models/NewsItem.js

const mongoose = require('mongoose');

const NewsItemSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  hackerNewsUrl: {
    type: String,
    required: true
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  upvotes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);
