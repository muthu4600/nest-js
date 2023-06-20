'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProfile', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      profileId: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      displayName: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING(50),
      },
      phoneNumber: {
        type: Sequelize.STRING(50),
      },
      preferredLanguage: {
        type: Sequelize.STRING(50),
      },
      preferredCurrency: {
        type: Sequelize.STRING(50),
      },
      verificationCode: {
        type: Sequelize.INTEGER
      },
      countryCode: {
        type: Sequelize.STRING(10)
      },
      countryName: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserProfile');
  }
};