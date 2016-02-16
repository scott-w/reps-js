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
      'UserId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      }
    ).then(function() {
      return queryInterface.changeColumn(
        'Exercises',
        'LocationId',
        {
          type: Sequelize.BIGINT,
          allowNull: true
        }
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Exercises', 'UserId').then(function() {
      return queryInterface.changeColumn(
        'Exercises',
        'LocationId',
        {
          type: Sequelize.BIGINT,
          allowNull: false
        }
      );
    });
  }
};
