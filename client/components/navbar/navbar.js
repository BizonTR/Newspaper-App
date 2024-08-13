import { Template } from 'meteor/templating';
import { currentTag, currentPage, updatePageRange, handleFetchResult, getCountryFromUrl } from '../../main.js';

Template.navbar.onCreated(function () {
  this.autorun(() => {
    const country = getCountryFromUrl() || "tr";
    const countryNames = {
      "tr": "Türkiye",
      "en": "İngiltere",
      "de": "Almanya"
    };
    const countryText = countryNames[country] || 'Türkiye';
    
    Tracker.afterFlush(() => {
      const selectedCountryElement = document.getElementById('selectedCountry');
      if (selectedCountryElement) {
        selectedCountryElement.innerText = `Seçili Ülke: ${countryText}`;
      }
    });
  });
});

Template.navbar.events({
  'click .nav-link': function (event) {
    event.preventDefault();
    const tag = event.target.dataset.tag;
    currentTag.set(tag);
    currentPage.set(0);
    const country = getCountryFromUrl() || "tr";
    Meteor.call('news.fetchGeneral', country, tag, handleFetchResult);
    updatePageRange(0);
  },
  'submit #searchForm': function (event) {
    event.preventDefault();
    const city = event.target.city.value.trim();
    if (city) {
      Meteor.call('news.fetchByCity', city, handleFetchResult);
    } else {
      const tag = currentTag.get();
      Meteor.call('news.fetchGeneral', getCountryFromUrl() || "tr", tag, 0, handleFetchResult);
    }
  },
  'click .dropdown-item': function (event) {
    event.preventDefault();
    const country = event.target.dataset.country;
    const countryNames = {
      "tr": "Türkiye",
      "en": "İngiltere",
      "de": "Almanya"
    };
    if (country) {
      // URL'yi güncelle
      window.history.pushState({}, '', `/${country}`);
      // Haberleri yeniden çek
      Meteor.call('news.fetchGeneral', country, currentTag.get(), 0, handleFetchResult);
      
      // Seçilen ülkeyi güncelle
      Tracker.afterFlush(() => {
        const selectedCountryElement = document.getElementById('selectedCountry');
        if (selectedCountryElement) {
          selectedCountryElement.innerText = `Seçili Ülke: ${countryNames[country] || 'Türkiye'}`;
        }
      });
    }
  }
});
