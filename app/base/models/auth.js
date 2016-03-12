import _ from 'underscore';
import root from 'window-or-global';

import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';


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

  /** Return the login state of the user client-side. This doesn't confirm the
      credentials with the server.
  */
  isLoggedIn: function() {
    return !!this.get('token');
  },

  /** Check whether the user login is valid on the server.
  */
  checkServer: function() {

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

export const authSync = function(method, model_or_collection, options) {
  const user = new UserModel();
  user.fetch({
    success: () => {
      if (_.isUndefined(options.headers)) {
        options.headers = {};
      }
      _.extend(options.headers, getAuthHeader(user));
      Backbone.sync(method, model_or_collection, options);
    }
  });
};
