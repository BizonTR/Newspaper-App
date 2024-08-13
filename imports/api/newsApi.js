import { fetch } from 'meteor/fetch';

const apiKey = Meteor.settings.private.NEWS_API_KEY;

//console.log('API Key:', apiKey);

const fetchNews = (path) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.collectapi.com${path}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': apiKey
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then(parsedBody => {
      if (parsedBody.success) {
        resolve(parsedBody);
      } else {
        reject(new Error(parsedBody.message));
      }
    })
    .catch(err => {
      reject(new Error(`Failed to fetch data: ${err.message}`));
    });
  });
};

export const fetchGeneralNews = (country= 'tr', tag = 'general', page = 0) => {
  const path = `/news/getNews?country=${encodeURIComponent(country)}&tag=${encodeURIComponent(tag)}&paging=${page}`;
  return fetchNews(path);
};

export const fetchNewsByCity = (city, country = "tr") => {
  const path = `/news/getNewsLocal?country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}`;
  console.log(`Fetching news for city: ${city} and country: ${country} with path: ${path}`);
  return fetchNews(path);
};
