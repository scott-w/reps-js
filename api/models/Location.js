/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        var Workout = require('./workout')(sequelize, DataTypes);
        Location.hasMany(Workout, {as: 'Workout'});
        // associations can be defined here
      }
    }
  });
  return Location;
};
