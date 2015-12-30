var Barrels = require('barrels');

/**
 * testLogin
 *
 * @module      :: Policy
 * @description :: Automatically login user 1
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  var barrels = new Barrels();
  var users = barrels.data.user;
  var user = _.find(users, {id: 1});

  req.session.authenticated = true;
  req.session.user = user;
  next();
};
