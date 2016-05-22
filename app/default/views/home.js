/** The Homepage
*/
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {FormError, ValidationError} from '../../base/behaviors/form';

import {LoginModel, RegisterModel} from '../models/auth';
import {UserModel} from '../../base/models/auth';

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

  behaviors: {
    form: {
      behaviorClass: FormError,
      errors: {
        email: '#login-email',
        password: '#login-password'
      }
    }
  },

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

  behaviors: {
    error: {
      behaviorClass: FormError,
      errors: {
        first_name: '#register-first_name',
        last_name: '#register-last_name',
        email: '#register-email',
        password: '#register-password'
      }
    },
    validation: {
      behaviorClass: ValidationError,
      errors: {
        first_name: '#register-first_name',
        last_name: '#register-last_name',
        email: '#register-email',
        password: '#register-password'
      }
    }
  },

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
    Backbone.history.navigate('exercise/', {trigger: true});
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

  checkLogin: function() {
    const user = new UserModel();
    user.fetch({
      success: () => {
        if (user.get('token')) {
          this.redirectLogin();
        }
      }
    });
  },

  showLogin: function() {
    this.showChildView('layout', new Login({model: new LoginModel()}));
    Backbone.history.navigate('login');
    this.checkLogin();
  },

  showRegister: function() {
    this.showChildView('layout', new Register({model: new RegisterModel()}));
    Backbone.history.navigate('register');
    this.checkLogin();
  },

  onChildviewShowLogin: function() {
    this.showLogin();
  },

  onChildviewShowIndex: function() {
    this.showIndex();
  },

  onChildviewShowRegister: function() {
    this.showRegister();
  },

  redirectLogin: function() {
    Backbone.history.navigate('exercise/', {trigger: true});
  }
});
