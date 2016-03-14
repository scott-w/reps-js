'use strict';

const views = require('./views');

module.exports = [
  {
    config: {
      auth: 'jwt'
    },
    method: 'GET',
    path: '/me',
    handler: views.user
  },
  {
    config: {
      auth: 'jwt'
    },
    method: 'PUT',
    path: '/me',
    handler: views.update
  },
  {
    config: {
      auth: 'jwt'
    },
    method: 'PATCH',
    path: '/me/password',
    handler: views.password
  }
];
