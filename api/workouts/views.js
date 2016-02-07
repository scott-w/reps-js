/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');


const recordWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const date = request.payload.workout_date;
  const locationId = request.payload.location;

  models.Workout.findOne({
    attributes: ['workout_date'],
    where: {
      workout_date: date,
      UserId: userId
    }
  }).then((check) => {
    if (check) {
      reply({workout_date: 'Cannot duplicate the workout_date'}).code(400);
    }
    else {
      let sets = request.payload.sets || [];

      let createWorkout =

      models.Workout.create({
        'workout_date': date,
        UserId: userId,
        LocationId: locationId,
        Sets: _.map(sets, (set) => _.mapKeys(
          set, (val, key) => key === 'exercise' ? 'ExerciseId' : key))
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
        console.log(err);
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

  models.Workout.findOne({
    attributes: [
      'id', 'workout_date'
    ],
    where: {
      workout_date: request.params.workout_date,
      UserId: userId
    },
    include: [
      {
        model: models.Location
      }
    ]
  }).then(function(instance) {
    if (instance) {

      const workout = _.mapValues(instance.dataValues, (val, key) => {
        if (key === 'workout_date') {
          return moment(val).format('YYYY-MM-DD');
        }
        if (key === 'Location') {
          return val.dataValues;
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


module.exports = {
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  retrieveWorkout: retrieveWorkout
};
