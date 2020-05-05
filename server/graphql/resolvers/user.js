import { GraphQLScalarType, Kind } from 'graphql';

import { logger } from '../../config';

// import GraphQL from 'graphql';
// const { GraphQLScalarType, Kind } = GraphQL;

// import db from '../../models';

// console.log('DB?? ', db);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  Mutation: {
    login: async (parent, { userName, password }, { db, req }, info) => {
      console.log(userName, password);
      const user = await db.User.login(userName, password);
      // await sleep(150);
      if (user !== null) {
        logger.debug(`User "${user.name}" logged in successfully.`);
        req.login(user, (err) => {
          if (err) {
            throw err;
          }
        });
      }
      return user;
    },
  },

  Query: {},
};
