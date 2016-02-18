/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');

const models = require('../../models');

/** Get a single workout. Returns a Promise for the workout */
exports.getWorkout = (userId, workoutDate, joins) => models.Workout.findOne({
  attributes: [
    'id', 'workout_date'
  ],
  where: {
    workout_date: workoutDate,
    UserId: userId
  },
  include: _.map(joins || [], (modelName) => ({model: modelName}))
});

/** Get a single exercise for a user and name. Returns a Promise for the
  exercise */
exports.getExercise = (userId, exercise_name) => models.Exercise.findOne({
  attributes: [
    'id', 'exercise_name'
  ],
  where: {
    UserId: userId,
    exercise_name: {
      $iLike: exercise_name
    }
  }
});
