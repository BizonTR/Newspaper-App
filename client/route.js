import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Şablon dosyalarını import et
import './main.html';
import './components/newsListLayout.html';

// Ana sayfa için rota
const newsListRoutes = ['/', '/tr', '/en', '/de'];

newsListRoutes.forEach(route => {
  FlowRouter.route(route, {
    action: function() {
      BlazeLayout.render('mainLayout', { main: 'newsListLayout' });
    }
  });
});

// NewsPage için rota
FlowRouter.route('/newsPage', {
  name: 'newsPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'newsPageLayout' });
  }
});
