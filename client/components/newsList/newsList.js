import { Template } from 'meteor/templating';
import { newsData, errorData } from '../../main.js';

Template.newsList.helpers({
  news: function () {
    return newsData.get();
  },
  error: function () {
    return errorData.get();
  }
});