'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Exercises',
      'LocationId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'Locations',
          key: 'id'
        },
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Exercises', 'LocationId');
  }
};
