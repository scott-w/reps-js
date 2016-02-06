/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');


const recordWorkout = function(request, reply) {
  var userId = request.auth.credentials.id;
  var date = request.payload.workout_date;
  var locationId = request.payload.location;

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
      models.Workout.create({
        'workout_date': date,
        UserId: userId,
        LocationId: locationId
      }).then((instance) => {
        var workout = instance.dataValues;
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
  var userId = request.auth.credentials.id;

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
  var userId = request.auth.credentials.id;

  models.Workout.findOne({
    attributes: [
      'id', 'workout_date'
    ],
    where: {
      id: request.params.workout,
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
