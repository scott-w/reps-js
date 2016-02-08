/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const views = require('./views');


module.exports = [
  {
    method: 'GET',
    path: '/token',
    handler: views.token
  },
  {
    method: 'POST',
    path: '/user/',
    handler: views.createUser
  }
];
