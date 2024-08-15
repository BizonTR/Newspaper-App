import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.newsPageLayout.onCreated(function () {
  const savedNews = localStorage.getItem('selectedNews');
  if (savedNews) {
    Session.set('selectedNews', JSON.parse(savedNews));
  }
});

Template.newsPageLayout.helpers({
  selectedNews() {
    return Session.get('selectedNews');
  }
});
