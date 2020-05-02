// import GraphQL from 'graphql';
// const { GraphQLScalarType, Kind } = GraphQL;
import { GraphQLScalarType, Kind } from 'graphql';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  Mutation: {
    // test: (parent, args, { db }, info) => db.User.findAll(),
    login: async (parent, args, { db }, info) => {
      await sleep(2000);
      console.log('login mutation: ');
      return {
        id: 'id',
        token: 'token',
        name: 'test',
      };
    },
  },

  Query: {},
};
