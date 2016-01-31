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
    method: 'POST',
    path: '/workouts/',
    handler: views.recordWorkout
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'GET',
    path: '/workouts/{workout}',
    handler: views.retrieveWorkout
  }
];
