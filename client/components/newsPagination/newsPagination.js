import { Template } from 'meteor/templating';
import { currentPage, currentTag, totalPages, pageRange, updatePageRange, handleFetchResult, getCountryFromUrl } from '../../main.js';

Template.newsPagination.events({
  'click button.page-button': function (event) {
    const page = parseInt(event.target.dataset.page) - 1;
    const tag = currentTag.get();
    currentPage.set(page);
    if (getCountryFromUrl() === "" || getCountryFromUrl() === null) {
      Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
    } else {
      Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
    }

    updatePageRange(page);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'click button.prev': function () {
    let page = currentPage.get();
    if (page > 0) {
      page -= 1;
      currentPage.set(page);
      const tag = currentTag.get();
      if (getCountryFromUrl() === "" || getCountryFromUrl() === null) {
        Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
      } else {
        Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
      }
      updatePageRange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  'click button.next': function () {
    let page = currentPage.get();
    if (page < totalPages.get() - 1) {
      page += 1;
      currentPage.set(page);
      const tag = currentTag.get();
      if (getCountryFromUrl() === "" || getCountryFromUrl() === null) {
        Meteor.call('news.fetchGeneral', "tr", tag, page, handleFetchResult);
      } else {
        Meteor.call('news.fetchGeneral', getCountryFromUrl(), tag, page, handleFetchResult);
      }
      updatePageRange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
