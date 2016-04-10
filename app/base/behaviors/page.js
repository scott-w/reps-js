import {Behavior} from 'backbone.marionette';

import {PageView} from '../views/page';

export const Page = Behavior.extend({
  defaults: {
    pageEl: '.page-hook'
  },

  onBeforeRender: function() {
    this.view.addRegions({
      page: {
        el: this.getOption('pageEl'),
        replaceElement: true
      }
    });
  },

  onRender: function() {
    this.view.showChildView('page', new PageView({
      collection: this.view.collection
    }));
  }
});
