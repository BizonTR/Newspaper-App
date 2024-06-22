import { Meteor } from 'meteor/meteor';
import { fetchGeneralNews, fetchNewsByCity } from '/imports/api/newsApi.js';

Meteor.methods({
  'news.fetchGeneral': async function(tag, page = 0) {
    try {
      const news = await fetchGeneralNews(tag, page);
      return news;
    } catch (error) {
      throw new Meteor.Error('fetch-failed', `Failed to fetch ${tag} news`);
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
  // Server-side startup code if needed
});
