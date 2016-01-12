/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Workout;
};
