/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const uuid = require('uuid');

const models = require('../../models');

/** Get a single workout. Returns a Promise for the workout */
exports.getWorkout = (userId, workoutDate, joins) => models.Workout.findOne({
  attributes: [
    'id', 'workout_date', 'uuid'
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


/** Update sets for a workoutDate. This requires the exerciseDate to exist
    first.
    This will completely overwrite all existingSets with the value of
    requestSets. Where possible, this will leave unchanged sets.
*/
exports.updateSets = (existingSets, requestSets, workoutId) => {
  const sets = _.map(existingSets, (set) => set.dataValues.id);

  const setsToAdd = _.filter(
    requestSets,
    (set) => _.isUndefined(set.id) || !_.includes(sets, set.id));
  const setsToKeep = _.map(
    _.filter(
      requestSets,
      (set) => !_.isUndefined(set.id)
    ), (set) => set.id
  );

  const setsToRemove = _.filter(
    existingSets,
    (set) => !_.includes(setsToKeep, set.dataValues.id)
  );

  return models.Set.bulkCreate(
    _.map(setsToAdd, (set) => ({
      WorkoutId: workoutId,
      ExerciseId: set.exercise,
      reps: set.reps,
      weight: set.weight
    }))
  ).then(() => {
    return models.Set.destroy({
      where: {
        id: {
          $in: _.map(setsToRemove, (set) => set.dataValues.id)
        }
      }
    });
  }).then(() => {
    return models.Set.findAll({
      where: {
        WorkoutId: workoutId
      }
    });
  });
};

/** Create a workout with sets.
*/
exports.createWorkout = (workoutDate, userId, sets, locationId) => {
  let createData = {
    workout_date: workoutDate,
    UserId: userId,
    uuid: uuid.v4(),
    Sets: _.map(
      sets, (set) => ({
        ExerciseId: set.exercise,
        reps: set.reps,
        weight: set.weight
      })
    )
  };
  if (locationId) {
    createData.LocationId = locationId;
  }

  return models.Workout.create(createData, {
    include: [models.Set]
  });
};

/** Converts a DB Set list to a JSON output format
*/
exports.mapSet = (set) => ({
  id: set.dataValues.id,
  reps: set.dataValues.reps,
  weight: set.dataValues.weight,
  exercise: set.dataValues.ExerciseId,
  workout: set.dataValues.WorkoutId,
  createdAt: set.dataValues.createdAt,
  updatedAt: set.dataValues.updatedAt
});
