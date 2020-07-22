// import GraphQL from 'graphql';
// const { GraphQLScalarType, Kind } = GraphQL;
import { GraphQLScalarType, Kind } from 'graphql';

function loadColumn(colName, convert = (x) => x) {
  return async (parent, args, { db }, info) => convert((await parent.reload({ attributes: [colName] }))[colName]);
}

export default {
  Mutation: {
    test: (parent, args, argss, info) => {
      console.log('test mut');
      return '1234';
      // db.User.findAll()
    },
  },

  Query: {},
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
