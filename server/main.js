import { Meteor } from 'meteor/meteor';
import { fetchGeneralNews, fetchNewsByCity } from '/imports/api/newsApi.js';

Meteor.methods({
  'news.fetchGeneral': async function(country, tag, page = 0) {
    try {
      const news = await fetchGeneralNews(country, tag, page);
      return news;
    } catch (error) {
      console.error(`Error fetching general news: ${error.message}`); // Hata mesajını konsola yazdır
      throw new Meteor.Error('fetch-failed', `Failed to fetch ${tag} ${country} news`);
    }
  },
  'news.fetchByCity': async function(city) {
    try {
      const country = localStorage.getItem('selectedCountry') || 'Türkiye'; // Default ülke 'Türkiye'
      const news = await fetchNewsByCity(city, country);
      return news;
    } catch (error) {
      console.error(`Error fetching news for city: ${city}`, error); // Hata mesajını konsola yazdır
      throw new Meteor.Error('fetch-failed', `Failed to fetch news for city: ${city}`);
    }
  }
});

Meteor.startup(() => {
  // Server-side startup code if needed
});
