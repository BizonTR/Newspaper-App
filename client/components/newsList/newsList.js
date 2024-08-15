import { Template } from 'meteor/templating';
import { newsData, errorData, loading } from '../../main.js';

Template.newsList.helpers({
  news: function () {
    return newsData.get();
  },
  error: function () {
    return errorData.get();
  },
  loading: function () {
    return loading.get();
  }
});
