'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.STRING
      },
      reps: {
        type: Sequelize.INTEGER
      },
      workoutId: {
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id'
        },
        type: Sequelize.BIGINT
      },
      exerciseId: {
        allowNull: false,
        references: {
          model: 'Exercises',
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
    return queryInterface.dropTable('Sets');
  }
};
