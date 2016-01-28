/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var views = require('./views');


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
