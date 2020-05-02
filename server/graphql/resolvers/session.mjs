// import GraphQL from 'graphql';
// const { GraphQLScalarType, Kind } = GraphQL;
import { GraphQLScalarType, Kind } from 'graphql';

export default {
  Mutation: {
    // test: (parent, args, { db }, info) => db.User.findAll(),
    login: async (parent, args, { db }, info) => {
      console.log('login mutation: ', parent, args, db, info);

      return {
        id: 'id',
        token: 'token',
      };
    },
  },

  Query: {},
};
