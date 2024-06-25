import { Template } from 'meteor/templating';
import './newsCard.html';

Template.newsCard.events({
    'click .card': function (event) {
      const url = this.url;
      if (url) {
        window.open(url, '_blank');
      }
    }
  });
