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

  collectionEvents: {
    sync: 'render'
  },

  templateContext: function() {
    return {
      noNext: !this.collection.hasNextPage(),
      noPrev: !this.collection.hasPreviousPage()
    };
  },

  nextPage: function(e) {
    e.preventDefault();
    if (this.collection.hasNextPage()) {
      this.collection.getNextPage();
      this.triggerMethod('page:change');
    }
  },

  prevPage: function(e) {
    e.preventDefault();
    if (this.collection.hasPreviousPage()) {
      this.collection.getPreviousPage();
      this.triggerMethod('page:change');
    }
  },

  onPageChange: function() {
    this.render();
  }
});
