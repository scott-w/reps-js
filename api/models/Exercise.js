/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define('Exercise', {
    exercise_name: DataTypes.STRING,
    machine_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Exercise;
};
