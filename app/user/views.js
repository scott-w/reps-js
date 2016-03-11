import Syphon from 'backbone.syphon';

import {View} from 'backbone.marionette';


export const UserLayout = View.extend({
  className: 'container-fluid',
  template: require('./templates/layout.html'),

  ui: {
    form: 'form',
    undo: '.undo'
  },

  events: {
    'submit @ui.form': 'updateUser',
    'click @ui.undo': 'render'
  },

  modelEvents: {
    sync: 'render'
  },

  updateUser: function(e) {
    e.preventDefault();
    const nameFields = Syphon.serialize(this);
    this.model.updateUser({
      first_name: nameFields.first_name,
      last_name: nameFields.last_name
    });
  }
});
