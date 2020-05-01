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

// import { ApolloServer, AuthenticationError, gql } from 'apollo-server-express'; // How it should be
import ApolloServerExpress from 'apollo-server-express';
import typeDefs from './api/schema.mjs';
import resolvers from './api/resolvers.mjs';

const { ApolloServer, gql } = ApolloServerExpress;
// console.log(typeDefs);

async function setupAPI(app) {
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
  app.use(express.raw());
  app.use(express.text());

  const graphqlServer = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    // context: { db }
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';

      // try to retrieve a user with the token
      // const user = getUser(token);
      // const user = await db.User.findByPk(1);

      // optionally block the user
      // we could also check user roles/permissions here
      // if (!req.user) throw new AuthenticationError('you must be logged in');

      // add the user to the context
      return {};
      // return { db, user };
    },
  });

  graphqlServer.applyMiddleware({ app });
}

async function main() {
  const app = express();

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
