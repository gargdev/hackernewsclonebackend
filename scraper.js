// populate.js

const axios = require('axios');
const mongoose = require('mongoose');
const NewsItem = require('./models/NewsItem');

mongoose.connect('mongodb+srv://anooppandey937:8iw3I2Q4U8I7rWMB@project0.3ritt7o.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fetchNewsItems = async () => {
  try {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = response.data.slice(0, 30); // Fetching top 30 stories
    const newsItems = [];

    for (const storyId of topStoryIds) {
      const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
      const { by, descendants, id, kids, score, time, title, type, url } = storyResponse.data;
      const newsItem = {
        hnId: id,
        title,
        url,
        author: by,
        comments: descendants,
        upvotes: score,
        timestamp: time,
        type,
        hackerNewsUrl: '' // Set to empty string if Hacker News URL is not available
      };
      newsItems.push(newsItem);
    }

    return newsItems;
  } catch (error) {
    console.error('Error fetching news items:', error);
    return [];
  }
};

const populateDatabase = async () => {
  try {
    const newsItems = await fetchNewsItems();
    await NewsItem.deleteMany({}); // Clear existing data
    await NewsItem.insertMany(newsItems); // Insert new data
    console.log('Database populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDatabase();
