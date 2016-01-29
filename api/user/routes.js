/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var views = require('./views');

module.exports = [
  {
    config: {
      auth: 'jwt'
    },
    method: 'GET',
    path: '/me',
    handler: views.user
  }
];
