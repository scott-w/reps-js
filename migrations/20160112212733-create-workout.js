/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workout_date: {
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        type: Sequelize.BIGINT
      },
      LocationId: {
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id'
        },
        type: Sequelize.BIGINT
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Workouts');
  }
};
