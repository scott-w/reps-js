/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = require('./location');
  var Set = require('./set');
  var User = require('./user');

  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Workout.hasMany(Set, {as: 'Sets'});
  Workout.belongsTo(Location);
  Workout.belongsTo(User);
  return Workout;
};
