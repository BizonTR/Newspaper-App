
import { Template } from 'meteor/templating';
import { selectedNews } from '../components/newsCard/newsCard.js';

Template.newsPageLayout.helpers({
  selectedNews() {
    return selectedNews.get();
  }
});
