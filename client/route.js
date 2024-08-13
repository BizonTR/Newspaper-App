// routes.js
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
import NewsPage from '/imports/ui/pages/newsPage';

FlowRouter.route('/newsPage', {
  action(params) {
    mount(NewsPage, { params });
  }
});
