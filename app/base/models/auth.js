import _ from 'underscore';
import root from 'window-or-global';

import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';


export const authSync = function(method, model_or_collection, options) {
  const user = new UserModel();
  user.fetch({
    success: () => {
      const token = user.get('token');
      if (token) {
        if (_.isUndefined(options.headers)) {
          options.headers = {};
        }
        _.extend(options.headers, {Authorization: `Bearer ${token}`});
      }
      Backbone.sync(method, model_or_collection, options);
    }
  });
};


export const UserModel = Backbone.Model.extend({
  url: '/me',

  localStorage: new LocalStorage('UserModel'),
  defaults: {
    id: 'current',
    first_name: '',
    last_name: '',
    email: '',
    token: ''
  },

  /** Pull the logged-in user from the server
  */
  getProfile: function(options) {
    this.fetch({
      success: () => {
        const token = this.get('token');

        options = options || {};
        options.headers = options.headers || {};

        _.extend(options, {ajaxSync: true});
        _.extend(options.headers, {Authorization: `Bearer ${token}`});
        console.log(options);
        this.fetch(options);
      }
    });
  },

  /** Return the login state of the user client-side. This doesn't confirm the
      credentials with the server.
  */
  isLoggedIn: function() {
    return !!this.get('token');
  },

  /** Check whether the user login is valid on the server. This is an AJAX
      function that triggers:
        * 'login' - user is logged in
        * 'logout' - user login is invalid and should be cleared
  */
  checkServer: function() {
    this.getProfile({
      success: () => this.trigger('login'),
      error: () => this.trigger('logout')
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
  }
});
