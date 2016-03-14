import Syphon from 'backbone.syphon';

import {View} from 'backbone.marionette';


const PasswordView = View.extend({
  template: require('./templates/password.html'),
  className: 'row',

  ui: {
    changePassword: '.password-button',
    cancel: '.cancel-button'
  },

  events: {
    'click @ui.changePassword': 'changePassword'
  },

  changePassword: function() {
    const {password1, password2} = Syphon.serialize(this);

    this.model.changePassword(password1, password2);
  }
});


export const UserLayout = View.extend({
  className: 'container-fluid',
  template: require('./templates/layout.html'),

  ui: {
    form: 'form',
    showPassword: '.show-password',
    undo: '.undo'
  },

  regions: {
    password: {
      selector: '.change-password-hook',
      replaceElement: true
    }
  },

  childEvents: {
    'click @ui.cancel': 'closePassword'
  },

  events: {
    'submit @ui.form': 'updateUser',
    'click @ui.undo': 'render',
    'click @ui.showPassword': 'showPassword'
  },

  modelEvents: {
    sync: 'render'
  },

  updateUser: function(e) {
    e.preventDefault();
    const {first_name, last_name} = Syphon.serialize(this);
    this.model.updateUser({
      first_name: first_name,
      last_name: last_name
    });
  },

  showPassword: function() {
    if (this.getRegion('password').hasView()) {
      return;
    }
    this.showChildView('password', new PasswordView({
      model: this.model
    }));
  },

  closePassword: function() {
    const password = this.getRegion('password');
    if (password.hasView()) {
      password.empty();
    }
  }
});
