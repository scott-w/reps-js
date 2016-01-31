/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = require('./location')(sequelize, DataTypes);
  var Set = require('./set')(sequelize, DataTypes);
  var User = require('./user')(sequelize, DataTypes);

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
  Workout.belongsTo(Location, {as: 'location'});
  Workout.belongsTo(User, {as: 'user'});
  return Workout;
};
