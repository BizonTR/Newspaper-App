// newsCard.js

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

export const selectedNews = new ReactiveVar(null);

Template.newsCard.events({
  'click .card': function (event) {
    selectedNews.set(this);
    console.log('Selected News:', selectedNews.get());
    FlowRouter.go('/newsPage');
  }
});

Template.newsCard.helpers({
  imageWithFallback() {
    const imageUrl = this.image;
    const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXQ6G25zyfOkV-l07fuhWCPQnz6CviD9B4A&s';
    return imageUrl && imageUrl !== '' ? imageUrl : placeholder;
  }
});

Template.newsCard.onRendered(function () {
  this.$('img').on('error', function () {
    $(this).attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXQ6G25zyfOkV-l07fuhWCPQnz6CviD9B4A&s');
  });
});
