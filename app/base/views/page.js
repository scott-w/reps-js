import Mn from 'backbone.marionette';

export const PageView = Mn.View.extend({
  tagName: 'nav',
  template: require('../templates/page.html'),

  ui: {
    next: '.next-page',
    prev: '.previous-page'
  },

  events: {
    'click @ui.next': 'nextPage',
    'click @ui.prev': 'prevPage'
  },

  nextPage: function(e) {
    e.preventDefault();
    if (this.collection.hasNextPage()) {
      this.collection.getNextPage();
    }
  },

  prevPage: function(e) {
    e.preventDefault();
    if (this.collection.hasPreviousPage()) {
      this.collection.getPreviousPage();
    }
  }
});
