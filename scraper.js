const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const NewsItem = require('./models/NewsItem');

async function scrapeAndSaveNews() {
  try {
    for (let page = 1; page <= 3; page++) {
      const response = await axios.get(`https://news.ycombinator.com/news?p=${page}`);
      const html = response.data;
      const $ = cheerio.load(html);
      $('.storylink').each(async (index, element) => {
        const url = $(element).attr('href');
        const title = $(element).text().trim();
        const hackerNewsUrl = `https://news.ycombinator.com/${$(element).parent().next().children('a').attr('href')}`;
        const upvotes = parseInt($(element).parent().next().children('.score').text().split(' ')[0]);
        const comments = parseInt($(element).parent().next().next().children('a').text().split(' ')[0]);
        let existingNewsItem = await NewsItem.findOne({ url });
        if (existingNewsItem) {
          existingNewsItem.upvotes = upvotes;
          existingNewsItem.comments = comments;
          await existingNewsItem.save();
        } else {
          const newNewsItem = new NewsItem({
            url,
            title,
            hackerNewsUrl,
            upvotes,
            comments
          });
          await newNewsItem.save();
        }
      });
    }
    console.log('Scraping and updating database completed successfully');
  } catch (error) {
    console.error('Error scraping and updating database:', error);
  }
}

mongoose.connect('mongodb+srv://anooppandey937:8iw3I2Q4U8I7rWMB@project0.3ritt7o.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  scrapeAndSaveNews();
})
.catch(err => console.error('Error connecting to MongoDB:', err));
