import express from 'express';
// import session from "express-session";

// import passport from "passport";
// import LocalStrategy from "passport-local";

// import bcrypt from "bcrypt";
// const SALT_ROUNDS = 10;

// // import initializeAPI from "./api/api";
// import { config, logger } from "./config";
// import initializeAPI from "./api";

// import db from "./models";

// const app

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(async function(id, cb) {
//   let user = await db.User.findByPk(id);
//   cb(null, user);
// });

// passport.use(
//   new LocalStrategy(async function(username, password, done) {
//     // let hashed_password = await bcrypt.hash("admin", SALT_ROUNDS);
//     console.log("LOIGING?")
//     username ='admin'
//     password ='admin'
//     let user = await db.User.findOne({
//       where: {
//         name: username
//       }
//     });

//     if (user) {
//       user = bcrypt.compareSync(password, user.password) ? user : null;
//     }

//     return done(null, user);
//     // User.findOne({ username: username }, function(err, user) {
//     //   if (err) { return done(err); }
//     //   if (!user) {
//     //     return done(null, false, { message: 'Incorrect username.' });
//     //   }
//     //   if (!user.validPassword(password)) {
//     //     return done(null, false, { message: 'Incorrect password.' });
//     //   }
//     //   return done(null, user);
//     // });
//   })
// );

import { ApolloServer, AuthenticationError, gql } from 'apollo-server-express'; // How it should be
// import ApolloServerExpress from 'apollo-server-express';
// import typeDefs from './api/schema';
// import resolvers from './api/resolvers';
// import * as test from './graphql';
// console.log(test);

// const { ApolloServer, gql } = ApolloServerExpress;
// console.log(typeDefs);
import setupGraphQL from './graphql';

async function main() {
  const app = express();

  await setupGraphQL(app);

  app.get('/test', async (req, res) => {
    console.log('got test');

    res.json({ hi: 'byee' });
  });

  app.listen({ port: 3002 }, () => {
    console.log('listening');
  });
}

// if (!module.parent) {
main()
  .then((text) => {
    // console.log("main then: ",text);
  })
  .catch((err) => {
    console.error('main failed: ', err);
    // Deal with the fact the chain failed
  }); // this is the main module
// }
