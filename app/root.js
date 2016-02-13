import Marionette from 'backbone.marionette';

const Nav = Marionette.View.extend({
  className: 'container-fluid',
  template: require('./templates/nav.html')
});

const Layout = Marionette.View.extend({
  template: require('./templates/base.html'),

  regions: {
    main: '#main',
    nav: '#nav'
  },

  onRender: function() {
    this.showChildView('nav', new Nav());
  }
});

export default new Layout();
