'use strict';
const _ = require('lodash');
const googleapi = require('googleapis');
const moment = require('moment');
const parse = require('json-parse');

const google = require('../user/google');

const models = require('../../models');


const _toMilliseconds = function(isoformat) {
  return moment(isoformat).format('x');
};

const _getEnd = function(isoformat) {
  return _toMilliseconds(_.isUndefined(isoformat) ? moment() : isoformat);
};

exports.sendWorkout = function(userId, payload, success) {
  const start = _toMilliseconds(payload.session_start);
  const end = _getEnd(payload.session_end);
  const uuid = payload.uuid;

  console.log(`uuid: ${uuid}`);
  if (!uuid) {
    return success('No UUID set');
  }
  const workout = {
    id: uuid,
    activityType: 97,
    userId: 'me',
    sessionId: uuid,
    startTimeMillis: start,
    endTimeMillis: end,
    application: {
      name: 'Pump3d'
    },
    name: 'Pump3d workout'
  };
  console.log('Workout', workout);

  const client = google.oauth2Client();

  return models.User.findOne({
    attributes: ['fit_token'],
    where: {
      id: userId
    }
  }).then(user => {
    const token = parse(user.dataValues.fit_token);
    console.log('Token', token);

    client.setCredentials(token);
    const fit = googleapi.fitness({
      version: 'v1',
      auth: client
    });

    console.log('Auth', client);
    return fit.users.sessions.update(workout, success);
  });
};
