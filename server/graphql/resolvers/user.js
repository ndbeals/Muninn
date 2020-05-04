// import GraphQL from 'graphql';
// const { GraphQLScalarType, Kind } = GraphQL;
import { GraphQLScalarType, Kind } from 'graphql';

import db from '../../models';

// console.log('DB?? ', db);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  Mutation: {
    // test: (parent, args, { db }, info) => db.User.findAll(),
    login: async (parent, args, { dbb }, info) => {
      const user = await db.User.login('admin', 'admin');
      console.log('user reslv: ', user, db === dbb);
      // await sleep(150);
      console.log('login mutation: ', parent, args);
      return {
        id: 'id',
        token: 'tokenNN',
        name: 'test',
      };
    },
  },

  Query: {},
};
