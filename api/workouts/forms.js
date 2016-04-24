'use strict';

const validate = require('validate.js');


exports.exerciseQueryErrors = (params) => validate(params, {
  exercise_name: {
    length: {
      minimum: 1
    },
    presence: true
  }
});

exports.createWorkoutErrors = (params) => validate(params, {
  workout_date: {
    presence: true
  }
});
