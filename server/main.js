import { Meteor } from 'meteor/meteor';
import { fetchGeneralNews, fetchNewsByCity } from '/imports/api/newsApi.js';

// const apiKey = Meteor.settings.private.NEWS_API_KEY;
// console.log('API Key:', apiKey);

Meteor.methods({
  'news.fetchGeneral': async function(country, tag, page = 0) {
    try {
      const news = await fetchGeneralNews(country, tag, page);
      return news;
    } catch (error) {
      throw new Meteor.Error('fetch-failed', `Failed to fetch ${tag} ${country} news`);
    }
  },
  'news.fetchByCity': async function(city) {
    try {
      const news = await fetchNewsByCity(city);
      return news;
    } catch (error) {
      console.error(`Error fetching news for city: ${city}`, error);
      throw new Meteor.Error('fetch-failed', `Failed to fetch news for city: ${city}`);
    }
  }
});

Meteor.startup(() => {
  // console.log('API Key Server:', process.env.NEWS_API_KEY);
  // Server-side startup code if needed
});
