/* jshint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {

  var Set = sequelize.define('Set', {
    weight: DataTypes.STRING,
    reps: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Set.belongsTo(models.Exercise);
      }
    }
  });

  return Set;
};
