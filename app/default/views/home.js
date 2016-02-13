/** The Homepage
*/
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import LoginModel from '../models/login';


const Index = Marionette.View.extend({
  className: 'row',
  template: require('../templates/default.html'),

  ui: {
    login: '.login-button'
  },

  triggers: {
    'click @ui.login': 'show:login'
  }
});

const Login = Marionette.View.extend({
  className: 'row',
  template: require('../templates/login.html'),

  ui: {
    form: 'form',
    register: '.register-button'
  },

  triggers: {
    'click @ui.register': 'show:register'
  },

  events: {
    'submit @ui.form': 'login'
  },

  login: function(e) {
    e.preventDefault();
    var data = Syphon.serialize(this);
    this.model.set(data);
    this.model.fetch();
  }
});

export const Layout = Marionette.View.extend({
  template: require('../templates/layout.html'),

  regions: {
    layout: '.layout-hook'
  },

  showIndex: function() {
    this.showChildView('layout', new Index());
    Backbone.history.navigate('');
  },

  showLogin: function() {
    this.showChildView('layout', new Login({model: new LoginModel()}));
    Backbone.history.navigate('login');
  },

  onChildviewShowLogin: function() {
    this.showLogin();
  },

  onChildviewShowIndex: function() {
    this.showIndex();
  }
});
