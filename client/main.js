import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './main.html';
import './components/newsListLayout.html';
import './components/navbar/navbar.html'
import './components/newsCard/newsCard.html'
import './components/newsList/newsList.html';
import './components/newsPagination/newsPagination.html';
import './components/footer/footer.html';

import './components/navbar/navbar.js';
import './components/newsCard/newsCard.js';
import './components/newsList/newsList.js';
import './components/newsPagination/newsPagination.js';
import './components/footer/footer.js';
import './route.js';
import './components/newsPageLayout.js';


const newsData = new ReactiveVar([]);
const errorData = new ReactiveVar(null);
const currentPage = new ReactiveVar(0); // default sayfa numarası
const currentTag = new ReactiveVar('general'); // default news kategorisi
const totalPages = new ReactiveVar(20); // maks 20 sayfa var olarak ayarlandı
const pageRange = new ReactiveVar([]); // baslangıc sayfa araligi
const loading = new ReactiveVar(true);

export { newsData, errorData, loading, currentPage, currentTag, totalPages, pageRange };

export const handleFetchResult = (error, result) => {
  if (error) {
    console.error('Error fetching news:', error);
    errorData.set(error.reason || error.message);
  } else if (result && result.result) {
    newsData.set(result.result.slice(0, 20)); // Limit to 20 news items
    errorData.set(null);
  } else {
    console.error('Unexpected API response format:', result);
    newsData.set([]);
  }

  loading.set(false);
};

export const updatePageRange = (currentPage) => {
  const total = totalPages.get();
  let start = Math.max(1, currentPage - 2 + 1);
  let end = Math.min(total, start + 4);

  start = Math.max(1, end - 4);

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  pageRange.set(range);
};

export const getCountry = () => {
  // const pathArray = window.location.pathname.split('/');
  // return pathArray[1];
  const countryFromLocalStorage = localStorage.getItem('selectedCountry');
  return countryFromLocalStorage ? countryFromLocalStorage : 'tr';
}

Meteor.startup(() => {
  const country = getCountry();
  const tag = localStorage.getItem('selectedTag') || 'general';
  console.log(country);
  if (country === "" || country === null) {
    Meteor.call('news.fetchGeneral', "tr", tag, 0, handleFetchResult);
    updatePageRange(0);
  } else {
    Meteor.call('news.fetchGeneral', country, tag, 0, handleFetchResult);
    updatePageRange(0);
  }
});