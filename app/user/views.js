import root from 'window-or-global';
import Backbone from 'backbone';
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

  triggers: {
    'click @ui.cancel': 'close:password'
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

  childViewEvents: {
    'close:password': 'closePassword'
  },

  events: {
    'submit @ui.form': 'updateUser',
    'click @ui.undo': 'render',
    'click @ui.showPassword': 'showPassword'
  },

  modelEvents: {
    sync: 'render'
  },

  onRender: function() {
    if (root.location.search) {
      this.model.updateFitToken(root.location.search);
      Backbone.history.navigate('/profile'); // Clear the code
    }
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
