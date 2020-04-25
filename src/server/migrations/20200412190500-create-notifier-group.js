'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NotifierGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserGroups',
          key: 'id'
        }
      },
      parentID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'NotifierGroups',
          key: 'id',
        }
      },
      displayName: {
        type: Sequelize.STRING
      },
      extraData: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NotifierGroups', {cascade: true});
  }
};