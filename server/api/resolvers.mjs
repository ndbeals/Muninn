import GraphQLScalarType from 'graphql';
// import { Kind } from 'graphql/language';

function loadColumn(colName, convert = (x) => x) {
  return async (parent, {}, { db }, info) =>
    convert((await parent.reload({ attributes: [colName] }))[colName]);
}

export default {
  Mutation: {
    test: (parent, args, { db }, info) => db.User.findAll(),
  },

  Query: {
    // User: (parent, { id }, { db }, info) => db.User.findByPk(id),
    User(parent, { id }, { db }, info) {
      return db.User.findByPk(id);
    },
    Users: (parent, args, { db }, info) => db.User.findAll(),

    Notifier: (parent, { id }, { db }, info) => db.Notifier.findByPk(id),
    Notifiers: (parent, args, { db }, info) => db.Notifier.findAll(),

    NotifierGroup: (parent, { id }, { db }, info) =>
      db.NotifierGroup.findByPk(id),

    // NotifierGroups: async (parent, args, { db, user }, info) => {
    BaseNotifierGroups: async (parent, args, { db, user }, info) => {
      const user_groups = await user.getUserGroups();
      const notifier_groups = [];

      for (const user_group of user_groups) {
        const notifier_group = await user_group.getNotifierGroups({
          where: {
            parentID: null,
          },
        });
        notifier_groups.push(...notifier_group);
      }
      return notifier_groups;
    },
    // NotifierGroupTree: (parent, args, { db }, info) => db.NotifierGroup.findAll({ include: [{ model: db.NotifierGroup, nested: true }]}),
    NotifierGroupTree: (parent, args, { db }, info) =>
      db.NotifierGroup.findAll(),

    Notification: (parent, { id }, { db }, info) =>
      db.Notification.findByPk(id),
    Notifications: (parent, args, { db }, info) => db.Notification.findAll(),
  },
  User: {
    Groups: async (parent, args, { db }, info) => {
      // let v = await (db.User.findByPk(parent.id));
      // await v.getUserGroups()
      const v = await parent.getUserGroups();
      console.log('V? ', v, ' |');
      return v;
    },
    //   .getGroups().Groups,

    // async createdAt(parent, {}, { db }, info) {
    //   return (await parent.reload({ attributes: ["createdAt"] })).createdAt;
    // },
    // updatedAt: loadColumn("updatedAt", col => col.toISOString())
  },

  Notifier: {
    Group: async (parent, args, { db }, info) =>
      db.NotifierGroup.findByPk(parent.notifierGroupID),

    Events: async (parent, args, { db }, info) => parent.getEvents(),
  },

  NotifierGroup: {
    Notifiers: async (parent, args, { db }, info) =>
      db.Notifier.findAll({ where: { notifierGroupID: parent.id } }),

    Parent: async (parent, args, { db }, info) =>
      db.NotifierGroup.findByPk(parent.parentID),

    Children: async (parent, args, { db }, info) => parent.getNotifierGroups(),

    Owner: async (parent, args, { db }, info) =>
      db.UserGroup.findByPk(parent.ownerID),
  },
  Notification: {
    UserGroup: async (parent, args, { db }, info) => parent.getUserGroups(),

    Events: async (parent, args, { db }, info) => parent.getEvents(),
    // Type: NotificationType!
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  // Author: {
  //     posts: (parent, args, context, info) => parent.getPosts(),
  // },
  // Post: {
  //     author: (parent, args, context, info) => parent.getAuthor(),
  // },
  // Query: {
  //     posts: (parent, args, { db }, info) => db.post.findAll(),
  //     authors: (parent, args, { db }, info) => db.author.findAll(),
  //     post: (parent, { id }, { db }, info) => db.post.findByPk(id),
  //     author: (parent, { id }, { db }, info) => db.author.findByPk(id)
  // },
  // Mutation: {
  //     createPost: (parent, { title, content, authorId }, { db }, info) =>
  //         db.post.create({
  //             title: title,
  //             content: content,
  //             authorId: authorId
  //         }),
  //     updatePost: (parent, { title, content, id }, { db }, info) =>
  //         db.post.update({
  //             title: title,
  //             content: content
  //         },
  //             {
  //                 where: {
  //                     id: id
  //                 }
  //             }),
  //     deletePost: (parent, { id }, { db }, info) =>
  //         db.post.destroy({
  //             where: {
  //                 id: id
  //             }
  //         })
  // }
};
