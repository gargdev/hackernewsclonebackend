const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: false },
  upvotes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  read: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('NewsItem', newsItemSchema);