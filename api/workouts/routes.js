/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const views = require('./views');


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
    path: '/workouts/{workout_date}',
    handler: views.retrieveWorkout
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'POST',
    path: '/workouts/{workout_date}',
    handler: views.addSetsToWorkout
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'PATCH',
    path: '/exercises/',
    handler: views.createExercise
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'PUT',
    path: '/workouts/{workout_date}',
    handler: views.updateWorkout
  },
  {
    config: {
      auth: 'jwt',
    },
    method: 'GET',
    path: '/exercises/',
    handler: views.getExercises
  }
];
