'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

var _ = require('lodash');

const env_private_key = process.env.JWT_PRIVATE_KEY;
const testing = _.includes(['test', 'ci', 'development'], process.env.NODE_ENV);
var privateKey;

if (_.isUndefined(env_private_key) && testing) {
  privateKey = 'myprivatekey';
}
else {
  privateKey = env_private_key;
}

exports.privateKey = 'myprivatekey';
