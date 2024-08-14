// newsPage.js

import { Template } from 'meteor/templating';
import { selectedNews } from '../components/newsCard/newsCard.js'; // ReactiveVar'ı import et

Template.newsPageLayout.helpers({
  selectedNews() {
    return selectedNews.get();
  }
});
