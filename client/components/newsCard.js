import { Template } from 'meteor/templating';
import './newsCard.html';

Template.newsCard.events({
  'click .card': function(event) {
    const url = event.currentTarget.getAttribute('data-url');
    if (url) {
      window.open(url, '_blank');
    }
  }
});
