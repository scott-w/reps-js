/** The Homepage
*/
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {LoginModel, RegisterModel} from '../models/auth';


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

  modelEvents: {
    sync: 'redirectLogin'
  },

  login: function(e) {
    e.preventDefault();
    var data = Syphon.serialize(this);
    this.model.login(data);
  },

  redirectLogin: function() {
    Backbone.history.navigate('workout/', {trigger: true});
  }
});

const Register = Marionette.View.extend({
  className: 'row',
  template: require('../templates/register.html'),

  ui: {
    form: 'form',
    login: '.login-button'
  },

  events: {
    'submit @ui.form': 'signup'
  },

  triggers: {
    'click @ui.login': 'show:login'
  },

  modelEvents: {
    sync: 'redirectLogin'
  },

  signup: function(e) {
    e.preventDefault();
    var data = Syphon.serialize(this);
    this.model.register(data);
  },

  redirectLogin: function() {
    Backbone.history.navigate('workout/', {trigger: true});
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

  showRegister: function() {
    this.showChildView('layout', new Register({model: new RegisterModel()}));
    Backbone.history.navigate('register');
  },

  onChildviewShowLogin: function() {
    this.showLogin();
  },

  onChildviewShowIndex: function() {
    this.showIndex();
  },

  onChildviewShowRegister: function() {
    this.showRegister();
  }
});
