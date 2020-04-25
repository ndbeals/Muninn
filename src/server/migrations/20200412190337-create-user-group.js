'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('UserGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    })
    
    return Promise.all([
      queryInterface.createTable('jnc_UserGroups', {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Users',
            key: 'id',
          }
        },
        userGroupID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'UserGroups',
            key: 'id'
          }
        },
        // createdAt: {
        //   allowNull: false,
        //   type: Sequelize.DATE
        // },
        // updatedAt: {
        //   allowNull: false,
        //   type: Sequelize.DATE
        // }
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.dropTable('jnc_UserGroups' ),
      queryInterface.dropTable('jnc_UserGroups', {cascade: true }),
      queryInterface.dropTable('UserGroups', {cascade: true }),
    ])
  }
};