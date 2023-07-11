'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('User', 'refreshToken', {
        type: Sequelize.STRING
      }),

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('User', 'refreshToken');
  }
};