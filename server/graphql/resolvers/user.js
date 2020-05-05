import { GraphQLScalarType, Kind } from 'graphql';
// import GraphQL from 'graphql';

import { logger, password_options } from '../../config';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  Mutation: {
    login: async (parent, { userName, password }, { db, req }, info) => {
      if (req.isUnauthenticated()) {
        const user = await db.User.login(userName, password);
        // await sleep(150);
        if (user !== null) {
          req.login(user, (err) => {
            logger.debug(`User "${user.name}" logged in successfully. ${err}`);
            if (err) {
              logger.error(`Login error: "${err}".`);
              throw err;
            }

            user.token = req.session.id;
          });
        }
        return user;
      }
      return req.user;
    },
  },

  Query: {
    // User: (parent, { id }, { db }, info) => db.User.findByPk(id),
    User(parent, { id }, { db, req }, info) {
      console.log('user resolver ', id, req.session, req.user);
      if (!id) {
        return req.user;
      }
      return db.User.findByPk(id);
    },
    Users(parent, args, { db }, info) {
      console.log('users resolver');
      return db.User.findAll();
    },
  },
};
