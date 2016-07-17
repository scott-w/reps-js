import _ from 'underscore';
import query from 'query-string';
import root from 'window-or-global';

import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import Radio from 'backbone.radio';


export const UserModel = Backbone.Model.extend({
  url: '/me',

  localStorage: new LocalStorage('UserModel'),

  defaults: {
    id: 'current',
    first_name: '',
    last_name: '',
    email: '',
    token: '',
    fit_token: ''
  },

  /** Return the login state of the user client-side. This doesn't confirm the
      credentials with the server.
  */
  isLoggedIn: function() {
    return !!this.get('token');
  },

  /** Fires a check against the server. Triggers 'login' if logged-in and
      'logout' if the user is logged-out
  */
  checkServer: function() {
    this.fetch({
      ajaxSync: true,
      success: () => this.trigger('login'),
      error: () => this.trigger('logout'),
      headers: getAuthHeader(this)
    });
  },

  clear: function(options) {
    return this.save({
      first_name: '',
      last_name: '',
      email: '',
      token: ''
    }, options);
  },

  /** Logs the user out. Fires the logout trigger on success.
  */
  logout: function() {
    root.localStorage.clear();
    this.clear({
      success: () => this.trigger('logout')
    });
  },

  /** Update the user
  */
  updateUser: function(fields) {
    const updateFields = _.defaults(
      fields, this.pick('first_name', 'last_name'));

    this.save(updateFields);
    this.save(updateFields, {
      ajaxSync: true,
      headers: getAuthHeader(this)
    });
  },

  /** Change the user's password
  */
  changePassword: function(password1, password2) {
    return this.save({
      password1: password1,
      password2: password2
    }, {
      url: '/me/password',
      patch: true,
      ajaxSync: true,
      headers: getAuthHeader(this),
      success: () => this.save({password1: undefined, password2: undefined})
    });
  },

  /** Update the user's fit_token with the system from the querystring. If the
    searchString param is undefined, this does nothing.
  */
  updateFitToken: function(searchString) {
    if (_.isUndefined(searchString)) {
      return;
    }

    const parsed = query.parse(searchString);
    return this.save({
      fit_token: parsed.code
    }, {
      ajaxSync: true,
      headers: getAuthHeader(this)
    });
  },

  validate: function(attrs) {
    const errors = {};

    if (!_.isUndefined(attrs.password1) || !_.isUndefined(attrs.password2)) {
      if (attrs.password1 !== attrs.password2) {
        errors.password = 'Passwords do not match';
      }
      else if (!attrs.password1.length || !attrs.password2.length) {
        errors.password = 'Cannot use an empty password';
      }
    }

    if (_.keys(errors).length) {
      return errors;
    }
  }
});


const getAuthHeader = function(userModel) {
  const token = userModel.get('token');
  if (_.isUndefined(token)) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`
  };
};


export const authSync = function(method, model_or_collection, options={}) {
  const user = new UserModel();
  const error = options.error;
  const authChannel = Radio.channel('auth');

  user.fetch({
    success: () => {
      if (_.isUndefined(options.headers)) {
        options.headers = {};
      }
      _.extend(options.headers, getAuthHeader(user));

      options.error = (jqXhr) => {
        if (jqXhr.status === 401) {
          authChannel.trigger('token:invalid', this);
        }
        if (!_.isUndefined(error)) {
          error.apply(this, arguments);
        }
      };
      Backbone.sync(method, model_or_collection, options);
      this.trigger('token:get');
    }
  });
};
