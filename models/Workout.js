/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {

  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Workout.belongsTo(models.Location);
        Workout.belongsTo(models.User);
        Workout.hasMany(models.Set);
      }
    }
  });
  return Workout;
};
