// newsCard.js

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

export const selectedNews = new ReactiveVar(null);

Template.newsCard.events({
  'click .card': function (event) {
    selectedNews.set(this);
    console.log('Selected News:', selectedNews.get()); // Konsola yazdır
    FlowRouter.go('/newsPage');
  }
});

