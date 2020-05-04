'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('EventTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON
      },
    },{
      updatedAt: false,
      timestamps: false
    });

    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EventTypes',
          key: 'id'
        }
      },
      eventDataID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EventData',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    },{
      paranoid: true,
      updatedAt: false
    });
    
    return async () => true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events', {cascade: true});
    return queryInterface.dropTable('EventTypes',{cascade: true});
  }
};