/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define('Exercise', {
    exercise_name: DataTypes.STRING,
    machine_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Exercise.hasMany(models.Set);
        Exercise.belongsTo(models.Location);
      }
    }
  });
  return Exercise;
};
