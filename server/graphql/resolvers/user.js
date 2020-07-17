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
      console.log('login mut');
      if (req.isUnauthenticated()) {
        const user = await db.User.login(userName, password);
        // console.log('user again: ', user, req.session);
        // await sleep(150);
        if (user !== null) {
          req.login(user, (err) => {
            logger.debug(`User "${user.name}" logged in successfully. ${err}`);
            if (err) {
              logger.error(`Login error: "${err}".`);
              throw err;
            }

            user.token = req.session.id;
            console.log(req.session.id);
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
      logger.trace(`user resolver ${req.isUnauthenticated()}`);
      if (!id) {
        return req.user;
      }
      return db.User.findByPk(id);
    },
    Users(parent, args, { db }, info) {
      logger.trace('users resolver');
      return db.User.findAll();
    },
  },
};
