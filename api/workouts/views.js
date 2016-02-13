/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');
const util = require('./util');


const recordWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.payload.workout_date;
  const locationId = request.payload.location;

  util.getWorkout(userId, workoutDate).then((check) => {
    if (check) {
      reply({workout_date: 'Cannot duplicate the workout_date'}).code(400);
    }
    else {
      let sets = request.payload.sets || [];

      let createWorkout =

      models.Workout.create({
        'workout_date': workoutDate,
        UserId: userId,
        LocationId: locationId,
        Sets: _.map(sets, (set) => _.mapKeys(set, (val, key) => {
          return key === 'exercise' ? 'ExerciseId' : key;
        }))
      }, {
        include: [models.Set]
      }).then((instance) => {
        const workout = instance.dataValues;
        const sets = _.map(instance.dataValues.Sets, (set) => set.dataValues);

        models.Location.findOne({
          where: {
            id: locationId
          },
          attributes: ['name', 'createdAt', 'updatedAt']
        }).then((result) => {
          const location = result.dataValues;

          reply({
            id: workout.id,
            workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
            Sets: sets,
            Location: {
              id: locationId,
              name: location.name,
              updatedAt: location.updatedAt,
              createdAt: location.createdAt
            }
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
    }
  }).then(function(results) {
    reply(_.map(results, function(item) {
      return {
        id: item.id,
        workout_date: moment(item.workout_date).format('YYYY-MM-DD'),
        url: `/workouts/${item.id}`
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

      const workout = _.mapValues(instance.dataValues, (val, key) => {
        if (key === 'workout_date') {
          return moment(val).format('YYYY-MM-DD');
        }
        if (key === 'Location') {
          return val.dataValues;
        }
        if (key === 'Sets') {
          return _.map(val, (item) => item.dataValues);
        }
        return val;
      });

      reply(workout);
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
            Sets: _.map(sets, (set) => set.dataValues),
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


module.exports = {
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  retrieveWorkout: retrieveWorkout,
  addSetsToWorkout: addSets
};
