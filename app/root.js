import Marionette from 'backbone.marionette';

const Layout = Marionette.View.extend({
  className: 'container',
  template: require('./templates/base.html'),

  regions: {
    main: '#main',
    nav: '#nav'
  }
});

export default new Layout();
