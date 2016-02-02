/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {

  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        var Location = require('./location')(sequelize, DataTypes);
        var Set = require('./set')(sequelize, DataTypes);
        var User = require('./user')(sequelize, DataTypes);

        Workout.hasMany(Set, {as: 'Sets'});
        Workout.belongsTo(Location, {as: 'location', foreign_key: 'locationId'});
        Workout.belongsTo(User, {as: 'user'});
      }
    }
  });
  return Workout;
};
