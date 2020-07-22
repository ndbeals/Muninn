import { GraphQLScalarType, Kind } from 'graphql';
// import GraphQL from 'graphql';

import { logger, password_options } from '../../config';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  Mutation: {},

  Query: {
    Notifier: (parent, { id }, { db }, info) => db.Notifier.findByPk(id),
    Notifiers: (parent, args, { db }, info) => db.Notifier.findAll(),

    NotifierGroup: (parent, { id }, { db }, info) => db.NotifierGroup.findByPk(id),

    // NotifierGroups: async (parent, args, { db, user }, info) => {
    BaseNotifierGroups: async (parent, args, { db, user }, info) => {
      const userGroups = await user.getUserGroups();
      const notifierGroups = [];

      for (const userGroup of userGroups) {
        const notifierGroup = await userGroup.getNotifierGroups({
          where: {
            parentID: null,
          },
        });
        notifierGroups.push(...notifierGroup);
      }
      return notifierGroups;
    },
    // NotifierGroupTree: (parent, args, { db }, info) => db.NotifierGroup.findAll({ include: [{ model: db.NotifierGroup, nested: true }]}),
    NotifierGroupTree: (parent, args, { db }, info) => db.NotifierGroup.findAll(),

    Notification: (parent, { id }, { db }, info) => db.Notification.findByPk(id),
    Notifications: async (parent, args, data, info) => {
      const notifications = await data.db.Notification.findAll();
      return notifications;
    },
  },

  Notification: {
    UserGroup: async (parent, args, { db }, info) => parent.getUserGroups(),

    Events: async (parent, args, { db }, info) => parent.getEvents(),
    // Type: NotificationType!
  },

  Notifier: {
    Group: async (parent, args, { db }, info) => db.NotifierGroup.findByPk(parent.notifierGroupID),

    Events: async (parent, args, { db }, info) => parent.getEvents(),
  },

  NotifierGroup: {
    Notifiers: async (parent, args, { db }, info) => db.Notifier.findAll({ where: { notifierGroupID: parent.id } }),

    Parent: async (parent, args, { db }, info) => db.NotifierGroup.findByPk(parent.parentID),

    Children: async (parent, args, { db }, info) => parent.getNotifierGroups(),

    Owner: async (parent, args, { db }, info) => db.UserGroup.findByPk(parent.ownerID),
  },
};
