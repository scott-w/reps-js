/* jshint node: true */
module.exports = function(sequelize, DataTypes) {

  var Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Workout.belongsTo(models.Location, {allowNull: true});
        Workout.belongsTo(models.User);
        Workout.hasMany(models.Set);
      }
    }
  });
  return Workout;
};
