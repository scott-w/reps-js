import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';

export const UserModel = Backbone.Model.extend({
  localStorage: new LocalStorage('UserModel'),
  defaults: {
    id: 'current',
    first_name: '',
    last_name: '',
    email: '',
    token: ''
  }
});

export const LoginModel = Backbone.Model.extend({
  urlRoot: '/token',

  validate: function(attrs) {
    const errors = {};
    if (_.isUndefined(attrs.email)) {
      errors.email = 'Email address not set';
    }
    if (_.isUndefined(attrs.password)) {
      errors.password = 'Password not set';
    }
    if (!_.isEmpty(errors)) {
      return errors;
    }
  },

  url: function() {
    if (this.isValid()) {
      let data = this.pick('email', 'password');
      let url = this.urlRoot;
      return `${url}?email=${data.email}&password=${data.password}`;
    }
    console.error('Form was not valid', this.validationError);
  },

  login: function(data) {
    this.set(data);

    this.fetch({success: () => {
      const fields = this.pick('first_name', 'last_name', 'email', 'token');

      const loggedIn = new UserModel(fields);
      loggedIn.save();
    }});
  }
});

export const RegisterModel = Backbone.Model.extend({
  url: '/user/',

  validate: function(attrs) {
    const errors = {};
    if (_.isUndefined(attrs.email)) {
      errors.email = 'Email address not set';
    }
    if (_.isUndefined(attrs.password)) {
      errors.password = 'Password not set';
    }
    if (!_.isEmpty(errors)) {
      return errors;
    }
  },

  register: function(data) {
    this.save(data, {success: () => {
      const fields = this.pick('email', 'first_name', 'last_name', 'token');

      const loggedIn = new UserModel(fields);
      loggedIn.save();
    }});
  }
});
