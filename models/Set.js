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
        var Exercise = require('./exercise')(sequelize, DataTypes);
        Set.belongsTo(Exercise);
      }
    }
  });

  return Set;
};
