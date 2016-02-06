/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Location.hasMany(models.Workout);
      }
    }
  });
  return Location;
};
