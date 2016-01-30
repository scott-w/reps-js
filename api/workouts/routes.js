/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var views = require('./views');


module.exports = [
  {
    config: {
      auth: 'jwt',
    },
    method: 'GET',
    path: '/workouts/',
    handler: views.workoutsByDate
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'GET',
    path: '/workouts/{date}/',
    handler: views.workoutOnDate
  }
];
