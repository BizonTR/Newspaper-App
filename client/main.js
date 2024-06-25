import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './main.html';
import './components/navbar.html'
import './components/newsCard.js'; // import the new newsCard component
import './components/navbar.js'; // import the new navbar component


const newsData = new ReactiveVar([]);
const errorData = new ReactiveVar(null);
const currentPage = new ReactiveVar(0); // default sayfa numarası
const currentTag = new ReactiveVar('general'); // default news kategorisi
const totalPages = new ReactiveVar(20); // maks 20 sayfa var olarak ayarlandı
const pageRange = new ReactiveVar([]); // baslangıc sayfa araligi

const handleFetchResult = (error, result) => {
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
};

const updatePageRange = (currentPage) => {
  const total = totalPages.get();
  let start = Math.max(1, currentPage - 2 + 1);
  let end = Math.min(total, start + 4);

  start = Math.max(1, end - 4);

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  pageRange.set(range);
};

function getCountryFromUrl() {
  const pathArray = window.location.pathname.split('/');
  return pathArray[1]; // İlk parça ülke kodunu içeriyor, örneğin '/de' için 'de' döndürecektir
}

Meteor.startup(() => {
  const country = getCountryFromUrl(); // URL'den ülke kodunu almak için bir fonksiyon kullanıyoruz, bu fonksiyonu tanımlayacağız
  console.log(country);
  if (country === "" || country === null) {
    Meteor.call('news.fetchGeneral', "tr", 'general', 0, handleFetchResult); // Meteor metodunu çağırırken ülke kodunu parametre olarak verdik
    updatePageRange(0);
  } else {
    Meteor.call('news.fetchGeneral', country, 'general', 0, handleFetchResult); // Meteor metodunu çağırırken ülke kodunu parametre olarak verdik
    updatePageRange(0);
  }
});

Template.navbar.events({
  'click .nav-link': function (event) {
    event.preventDefault();
    const tag = event.target.dataset.tag;
    currentTag.set(tag);
    currentPage.set(0);
    if (getCountryFromUrl() === "" || getCountryFromUrl === null) {
      Meteor.call('news.fetchGeneral', "tr", tag, handleFetchResult);
    }
    else{
      Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, handleFetchResult);
    }
    
    updatePageRange(0);
  },
  'submit #searchForm': function (event) {
    event.preventDefault();
    const city = event.target.city.value.trim();
    if (city) {
      Meteor.call('news.fetchByCity', city, handleFetchResult);
    } else {
      const tag = currentTag.get();
      Meteor.call('news.fetchGeneral', tag, 0, handleFetchResult);
    }
  }
});

Template.newsList.helpers({
  news: function () {
    return newsData.get();
  },
  error: function () {
    return errorData.get();
  }
});

Template.newsPagination.events({
  'click button.page-button': function (event) {
    const page = parseInt(event.target.dataset.page) - 1;
    const tag = currentTag.get();
    currentPage.set(page);
    if (getCountryFromUrl() === "" || getCountryFromUrl === null) {
      Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
    }
    else {
      Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
    }

    updatePageRange(page);
  },
  'click button.prev': function () {
    let page = currentPage.get();
    if (page > 0) {
      page -= 1;
      currentPage.set(page);
      const tag = currentTag.get();
      if (getCountryFromUrl() === "" || getCountryFromUrl === null) {
        Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
      }
      Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
      updatePageRange(page);
    }
  },
  'click button.next': function () {
    let page = currentPage.get();
    if (page < totalPages.get() - 1) {
      page += 1;
      currentPage.set(page);
      const tag = currentTag.get();
      if (getCountryFromUrl() === "" || getCountryFromUrl === null) {
        Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
      }
      Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
      updatePageRange(page);
    }
  }
});

Template.newsCard.events({
  'click .card': function (event) {
    const url = this.url;
    if (url) {
      window.open(url, '_blank');
    }
  }
});

Template.newsPagination.helpers({
  pages: function () {
    return pageRange.get();
  },
  isActive: function (page) {
    return currentPage.get() === (page - 1) ? 'active' : '';
  }
});
