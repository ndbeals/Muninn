'use strict';
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let i = 1;
      await queryInterface.bulkInsert('EventTypes', [
        {
          id: i++,
          name: 'NotifierReceived',
        },
        {
          id: i++,
          name: 'NotificationSent',
        },
        {
          id: i++,
          name: 'NotificationDelivered',
        },
        {
          id: i++,
          name: 'NotificationStateChanged',
        },
      ],{ transaction,
        ignoreDuplicates: true
      });

      i = 1;
      await queryInterface.bulkInsert('NotificationTypes', [
        {
          id: i++,
          name: 'Default',
        },

      ],{ transaction,
        ignoreDuplicates: true
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    return db.sequelize.sync()
  },

  down: (queryInterface, Sequelize) => {
    return db.sequelize.sync()
  }
};
