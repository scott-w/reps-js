import {View} from 'backbone.marionette';


export const UserLayout = View.extend({
  className: 'container-fluid',
  template: require('./templates/layout.html'),

  modelEvents: {
    sync: 'render'
  }
});
