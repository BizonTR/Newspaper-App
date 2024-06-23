import https from 'https';

const apiKey = 'apikey 26ZJStpeHtZ9e6Tm97Ccst:0hCWO3AEd2DJPBIrmBlxfx';

const fetchNews = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'api.collectapi.com',
      port: null,
      path: path,
      headers: {
        'content-type': 'application/json',
        'authorization': apiKey
      }
    };

    const req = https.request(options, (res) => {
      let chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        try {
          const parsedBody = JSON.parse(body);
          if (parsedBody.success) {
            resolve(parsedBody);
          } else {
            reject(new Error(parsedBody.message));
          }
        } catch (e) {
          reject(new Error('Failed to parse response body'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

export const fetchGeneralNews = (tag = 'general', page = 0) => {
  const path = `/news/getNews?country=tr&tag=${encodeURIComponent(tag)}&paging=${page}`;
  return fetchNews(path);
};

export const fetchNewsByCity = (city) => {
  const path = `/news/getNewsLocal?city=${encodeURIComponent(city)}`;
  console.log(`Fetching news for city: ${city} with path: ${path}`);
  return fetchNews(path);
};
