'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('NotificationTypes', {
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

    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserGroups',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'NotificationTypes',
          key: 'id',
        }
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      body: {
        type: Sequelize.JSON,
      },
      deliveredAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
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

    await queryInterface.createTable('jnc_NotificationEvents', {
      eventID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Events',
          key: 'id',
        }
      },
      notificationID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Notifications',
          key: 'id'
        }
      },
    });

    return async _ => true
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jnc_NotificationEvents',{cascade: true});
    return queryInterface.dropTable('Notifications',{cascade: true});
  }
};