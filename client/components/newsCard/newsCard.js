import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

const selectedNews = new ReactiveVar(JSON.parse(localStorage.getItem('selectedNews')));

Template.newsCard.events({
  'click .card': function (event) {
    const newsData = this;
    Session.set('selectedNews', newsData);
    localStorage.setItem('selectedNews', JSON.stringify(newsData));
    console.log('Selected News:', Session.get('selectedNews'));
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
