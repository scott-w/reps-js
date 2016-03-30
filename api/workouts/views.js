/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');
const util = require('./util');

const _replyExercise = function(data, reply) {
  return reply({
    exercise_name: data.exercise_name,
    id: data.id
  });
};

const getExercises = function(request, reply) {
  const userId = request.auth.credentials.id;
  const exerciseName = request.query.exercise_name;

  const whereClause = {
    UserId: userId
  };
  if (exerciseName) {
    whereClause.exercise_name  = {
      $ilike: `%${exerciseName}%`
    };
  }
  models.Exercise.findAll({
    select: ['id', 'exercise_name', 'createdAt', 'updatedAt'],
    where: whereClause,
    include: [
      {
        model: models.Set,
        select: ['id', 'reps', 'weight', 'createdAt', 'updatedAt'],
        include: [
          {
            model: models.Workout,
            select: ['workout_date'],
            where: {
              UserId: userId
            },
            required: false
          }
        ]
      }
    ]
  }).then((results) => reply(_.map(results, (exercise) => ({
    id: exercise.dataValues.id,
    exercise_name: exercise.dataValues.exercise_name,
    sets: _.map(exercise.dataValues.Sets, (set) => ({
      id: set.dataValues.id,
      reps: set.dataValues.reps,
      weight: set.dataValues.weight,
      workout_date: moment(
        set.dataValues.Workout.dataValues.workout_date).format('YYYY-MM-DD'),
      createdAt: set.dataValues.createdAt,
      updatedAt: set.dataValues.updatedAt
    }))
  }))));
};

const createExercise = function(request, reply) {
  const userId = request.auth.credentials.id;
  const exerciseName = request.payload.exercise_name;

  util.getExercise(userId, exerciseName).then(function(check) {
    if (check) {
      _replyExercise(check.dataValues, reply);
    }
    else {
      models.Exercise.create({
        UserId: userId,
        exercise_name: exerciseName
      }).then(function(instance) {
        _replyExercise(instance.dataValues, reply).code(201);
      }).catch(function(err) {
        console.log(err);
        reply({error: err}).code(400);
      });
    }
  });
};

const recordWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.payload.workout_date;
  const locationId = request.payload.location;

  util.getWorkout(userId, workoutDate).then(function(check) {
    if (check) {
      reply({workout_date: 'Cannot duplicate the workout_date'}).code(400);
    }
    else {
      util.createWorkout(
        workoutDate, userId, request.payload.sets || [], locationId
      ).then((instance) => {
        const workout = instance.dataValues;

        models.Location.findOne({
          where: {
            id: locationId
          },
          attributes: ['name', 'createdAt', 'updatedAt']
        }).then((result) => {
          let location;
          if (result) {
            location = {
              id: locationId,
              name: result.dataValues.name,
              updatedAt: result.dataValues.updatedAt,
              createdAt: result.dataValues.createdAt
            };
          }
          else {
            location = null;
          }
          reply({
            id: workout.id,
            workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
            sets: _.map(instance.dataValues.Sets, util.mapSet),
            location: location
          }).code(201);
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  });
};


const workoutsByDate = function(request, reply) {
  const userId = request.auth.credentials.id;

  models.Workout.findAll({
    attributes: [
      'workout_date', 'id'
    ],
    where: {
      UserId: userId
    },
    include: [
      {model: models.Location},
      {
        model: models.Set,
        required: false,
        attributes: ['reps', 'ExerciseId', 'weight'],
        include: [
          {model: models.Exercise, attributes: ['exercise_name']}
        ],
        where: {
          reps: {
            '$gt': 0
          }
        }
      }
    ],
    order: [
      ['workout_date', 'DESC']
    ]
  }).then(function(results) {
    reply(_.map(results, function(item) {
      const set = {};

      const sets = _.sortBy(
        item.Sets,
        (set) => parseInt(set.dataValues.weight, 10));

      if (sets.length > 0) {
        set.weight = sets[0].dataValues.weight;
        set.reps = sets[0].dataValues.reps;
        set.exercise_name = sets[0].dataValues.Exercise.dataValues.exercise_name;
      }
      let location;
      if (item.Location) {
        location = {
          name: item.Location.dataValues.name,
          id: item.Location.dataValues.id
        };
      }
      else {
        location = null;
      }

      return {
        id: item.id,
        workout_date: moment(item.workout_date).format('YYYY-MM-DD'),
        url: `/workouts/${moment(item.workout_date).format('YYYY-MM-DD')}`,
        summary: set,
        location: location
      };
    }));
  });
};

const retrieveWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  models.Workout.findOne({
    attributes: [
      'id', 'workout_date', 'LocationId'
    ],
    where: {
      workout_date: workoutDate,
      UserId: userId
    },
    include: [
      {model: models.Location},
      {model: models.Set, include: [models.Exercise]}
    ]
  }).then((instance) => {
    if (instance) {
      const workout = instance.dataValues;
      let location = null;
      if (workout.Location) {
        let locationVal = workout.Location.dataValues;
        location = {
          name: locationVal.name,
          id: locationVal.id
        };
      }

      reply({
        workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
        location: location,
        sets: _.map(workout.Sets, (set) => {
          const retSet = util.mapSet(set);
          retSet.exercise = set.dataValues.Exercise.dataValues.id;
          retSet.exercise_name = set.dataValues.Exercise.dataValues.exercise_name;
          return retSet;
        })
      });
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }

  });
};


const addSets = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  util.getWorkout(userId, workoutDate).then((instance) => {
    if (instance) {
      models.Set.bulkCreate(
        _.map(request.payload.sets, (set) => ({
          WorkoutId: instance.dataValues.id,
          ExerciseId: set.exercise,
          reps: set.reps,
          weight: set.weight
        }))
      ).then(() => {
        models.Set.findAll({
          where: {
            WorkoutId: instance.dataValues.id
          }
        }).then((sets) => {
          let response = {
            id: instance.dataValues.id,
            sets: _.map(sets, util.mapSet),
            workout_date: instance.dataValues.workout_date
          };
          reply(response).code(201);
        });
      });
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }
  });
};

const updateWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  util.getWorkout(userId, workoutDate, [models.Set]).then((instance) => {
    if (instance) {
      console.log('Updating Workout');
      util.updateSets(
        instance.dataValues.Sets, request.payload.sets, instance.dataValues.id
      ).then((sets) => {
        let response = {
          id: instance.dataValues.id,
          sets: _.map(sets, util.mapSet),
          workout_date: moment(
            instance.dataValues.workout_date
          ).format('YYYY-MM-DD')
        };

        reply(response).code(200);
      });
    }
    else {
      console.log('Creating Workout');
      util.createWorkout(
        workoutDate, userId, request.payload.sets, null
      ).then((instance) => {
        const workout = instance.dataValues;
        reply({
          id: workout.id,
          workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
          sets: _.map(instance.dataValues.Sets, util.mapSet),
          location: null
        }).code(201);
      });
    }
  });
};


module.exports = {
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  retrieveWorkout: retrieveWorkout,
  addSetsToWorkout: addSets,
  getExercises: getExercises,
  createExercise: createExercise,
  updateWorkout: updateWorkout
};
