'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notifierGroupID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NotifierGroups',
          key: 'id'
        }
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: true,
        allowNull: false,
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

    await queryInterface.createTable('jnc_NotifierEvents', {
      eventID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Events',
          key: 'id',
        }
      },
      notifierID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Notifiers',
          key: 'id'
        }
      },
    });

    return async _ => true
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jnc_NotifierEvents', {cascade: true })
    return queryInterface.dropTable('Notifiers',{cascade: true });
  }
};