'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const User = queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
    User.associate = (models) => {
      User.hasMany(models.UserProfile, {
        foreignKey: 'userId',
      })
    };

    return User;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};