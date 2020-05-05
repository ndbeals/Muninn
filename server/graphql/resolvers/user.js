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
      console.log('WAAA', userName, password, req.session);
      const user = await db.User.login(userName, password);
      // await sleep(150);
      if (user !== null) {
        // req.session.user = user;
        req.login(user, (err) => {
          logger.debug(`User "${user.name}" logged in successfully. ${err}`);
          if (err) {
            throw err;
          }

          user.token = req.session.id;
        });
      }
      return user;
    },
  },

  Query: {},
};
