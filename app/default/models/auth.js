import Backbone from 'backbone';

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
  }
});
