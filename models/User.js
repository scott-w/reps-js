/*eslint "no-unused-vars": 0*/

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    fit_token: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return User;
};
