'use strict';
const _ = require('lodash');
const moment = require('moment');
const googleapi = require('googleapi');
const uuid = require('uuid');

const google = require('../user/google');

const _toMilliseconds = function(isoformat) {
  return moment(isoformat).format('x');
};

const _getEnd = function(isoformat) {
  return _toMilliseconds(_.isUndefined(isoformat) ? moment() : isoformat);
};

exports.sendWorkout = function(userId, payload) {
  const start = _toMilliseconds(payload.session_start);
  const end = _getEnd(payload.session_end);

  const workout = {
    activityType: 97,
    userId: 'me',
    id: uuid.uuid4(),
    startTimeMillis: start,
    endTimeMillis: end,
    application: {
      name: 'Pump3d'
    },
    name: 'Pump3d workout'
  };
  const fit = googleapi.fitness({
    version: 'v1',
    auth: google.getClient()
  });
  fit.users.sessions.update(workout);
};
