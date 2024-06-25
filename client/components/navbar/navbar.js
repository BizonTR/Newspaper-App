import { Template } from 'meteor/templating';
import { currentTag, currentPage, updatePageRange, handleFetchResult, getCountryFromUrl,  } from '../../main.js';

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
