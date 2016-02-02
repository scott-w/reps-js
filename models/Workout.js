/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {

  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        var Location = require('./Location')(sequelize, DataTypes);
        var Set = require('./Set')(sequelize, DataTypes);
        var User = require('./User')(sequelize, DataTypes);

        Workout.hasMany(Set, {as: 'Sets'});
        Workout.belongsTo(Location, {as: 'location', foreign_key: 'locationId'});
        Workout.belongsTo(User, {as: 'user'});
      }
    }
  });
  return Workout;
};
