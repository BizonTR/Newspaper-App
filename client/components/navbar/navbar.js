import { Template } from 'meteor/templating';
import { currentTag, currentPage, updatePageRange, handleFetchResult, getCountry } from '../../main.js';
import { ReactiveVar } from 'meteor/reactive-var';

const selectedCountry = new ReactiveVar('Türkiye');

Template.navbar.onCreated(function () {
  this.autorun(() => {
    // URL'den ülke kodunu al ve güncelle
    const country = getCountry() || "tr";
    let countryText;
    if (country === "tr") {
      countryText = 'Türkiye';
    } else if (country === "en") {
      countryText = 'İngiltere';
    } else if (country === "de") {
      countryText = 'Almanya';
    } else {
      countryText = country.toUpperCase();
    }
    selectedCountry.set(countryText);
  });
});

Template.navbar.helpers({
  selectedCountry() {
    return selectedCountry.get();
  }
});

Template.navbar.events({
  'click .nav-link': function (event) {
    event.preventDefault();
    const tag = event.target.dataset.tag;
    currentTag.set(tag);
    currentPage.set(0);
    localStorage.setItem('selectedTag', tag);
    const country = getCountry() || "tr";
    Meteor.call('news.fetchGeneral', country, tag, handleFetchResult);
    updatePageRange(0);
    window.location.href = `/`;
  },
  'submit #searchForm': function (event) {
    event.preventDefault();
    const city = event.target.city.value.trim();
    const country = localStorage.getItem('selectedCountry') || 'tr';
    if (city) {
      Meteor.call('news.fetchByCity', city, country, handleFetchResult);
    } else {
      const tag = currentTag.get();
      Meteor.call('news.fetchGeneral', getCountry() || "tr", tag, 0, handleFetchResult);
    }
  },
  'click .dropdown-item': function (event) {
    event.preventDefault();
    const country = event.target.dataset.country;
    if (country) {
      let countryText;
      if (country === "tr") {
        countryText = 'Türkiye';
      } else if (country === "en") {
        countryText = 'İngiltere';
      } else if (country === "de") {
        countryText = 'Almanya';
      }
      selectedCountry.set(countryText);
      localStorage.setItem('selectedCountry', country);

      // URL'yi güncelle
      window.history.pushState({}, '', `/${country}`);
      
      // Ana sayfaya yönlendir ve haberleri fetch et
      const tag = localStorage.getItem('selectedTag') || 'general';
      Meteor.call('news.fetchGeneral', country, tag, 0, handleFetchResult);
      updatePageRange(0);
      
      // Ana sayfaya yönlendir
      window.location.href = `/${country}`;
    }
  }
});
