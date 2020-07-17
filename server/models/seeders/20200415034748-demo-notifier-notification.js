const db = require('..');
const { Handler } = require('../../events');

// const dev = (process.env.NODE_ENV || 'development') === 'development';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // if (!dev) {
    // }
    let group = await db.NotifierGroup.create(
      {
        displayName: 'Test Group 1',
        ownerID: 1,
        Notifiers: [
          {
            token: '123',
            extraData: { hi: 'test' },
          },
        ],
      },
      {
        include: [
          {
            // association: db.NotifierGroup.Notifiers,
            model: db.Notifier,
            include: [db.Event],
          },
        ],
      }
    );
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Title 1', body: 'Body 1' },
    });
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Title 2', body: 'Body 2' },
    });
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Title 3', body: 'Body 4' },
    });
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Title 4', body: 'Body 4' },
    });
    group = await db.NotifierGroup.create(
      {
        displayName: 'Sub Group 1',
        parentID: 1,
        ownerID: 1,
        Notifiers: [
          {
            token: '124',
          },
        ],
      },
      {
        include: [
          {
            model: db.Notifier,
            include: [db.Event],
          },
        ],
      }
    );
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Sub 1', body: 'You have said hello!' },
    });
    await Handler.TriggerEvent('NotifierReceived', {
      notifier: group.Notifiers[0],
      data: { title: 'Sub 2', body: 'Body 4' },
    });
    return db.sequelize.sync();
  },

  down: async (queryInterface, Sequelize) => {},
};
