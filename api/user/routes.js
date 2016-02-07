/* jshint node: true */
/* jshint esversion: 6 */
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
  }
];
