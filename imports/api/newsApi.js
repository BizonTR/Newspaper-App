import { fetch } from 'meteor/fetch';

const apiKey = Meteor.settings.private.NEWS_API_KEY;

const fetchNews = (path) => {
  const url = `https://api.collectapi.com${path}`;
  console.log(`Fetching data from URL: ${url}`); // URL'i konsola yazdır

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': apiKey
      }
    })
    .then(res => {
      if (!res.ok) {
        console.error(`HTTP error ${res.status} - ${res.statusText}`); // HTTP hata mesajını konsola yazdır
        throw new Error(`HTTP error ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then(parsedBody => {
      if (parsedBody.success) {
        resolve(parsedBody);
      } else {
        console.error(`API error: ${parsedBody.message}`); // API hata mesajını konsola yazdır
        reject(new Error(parsedBody.message));
      }
    })
    .catch(err => {
      console.error(`Fetch error: ${err.message}`); // Fetch hata mesajını konsola yazdır
      reject(new Error(`Failed to fetch data: ${err.message}`));
    });
  });
};

// Helper function to get selected country from localStorage
const getSelectedCountry = () => {
  const country = localStorage.getItem('selectedCountry') || 'Türkiye';
  switch (country) {
    case 'Türkiye':
      return 'tr';
    case 'İngiltere':
      return 'en';
    case 'Almanya':
      return 'de';
    default:
      return 'tr'; // default to Turkey if no match
  }
};

export const fetchGeneralNews = (country = 'tr', tag = 'general', page = 0) => {
  const path = `/news/getNews?country=${encodeURIComponent(country)}&tag=${encodeURIComponent(tag)}&paging=${page}`;
  console.log(`Fetching general news with path: ${path}`); // Path'i konsola yazdır
  return fetchNews(path);
};

export const fetchNewsByCity = (city, country = 'tr') => {
  const path = `/news/getNewsLocal?country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}`;
  console.log(`Fetching news for city: ${city} with path: ${path}`); // Path'i konsola yazdır
  return fetchNews(path);
};
