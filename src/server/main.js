// import { ApolloServer, gql } from "apollo-server-express";
// import faker from "faker";
// import times from "lodash.times";
// import random from "lodash.random";

// import typeDefs from "./api/schema";
// import resolvers from "./api/resolvers";

import express from "express";
import session from "express-session";

import passport from "passport";
import LocalStrategy from "passport-local";

import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

// import initializeAPI from "./api/api";
import { config, logger } from "./config";
import initializeAPI from "./api";

import db from "./models";


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  let user = await db.User.findByPk(id);
  cb(null, user);
});

passport.use(
  new LocalStrategy(async function(username, password, done) {
    // let hashed_password = await bcrypt.hash("admin", SALT_ROUNDS);
    console.log("LOIGING?")
    username ='admin'
    password ='admin'
    let user = await db.User.findOne({
      where: {
        name: username
      }
    });

    if (user) {
      user = bcrypt.compareSync(password, user.password) ? user : null;
    }

    return done(null, user);
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  })
);

async function main() {
  logger.info(
    `Begun initialization of ${config.name} backend & frontend.\n\tPort: ${config.port}`
  );

  const app = await initializeApp(config, logger); // sets up express app and middleware

  const graphqlServer = await initializeAPI(app, config, logger);

  app.listen({ port: config.port }, () =>
    console.log(
      // `🚀 Server ready at http://localhost:${config.port}${graphqlServer.graphqlPath}`
      `🚀 Server ready at http://localhost:${config.port}`
    )
  );
  // await app.listen({ port: config.port } )
}

async function initializeApp() {
  const app = express();

  /*  Static resources handling  */
  app.use(express.static("app/public"));

  // Parse submitted data
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
  app.use(express.raw());
  app.use(express.text());

  // Setup express-session
  app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  );

  // setup passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/login",
    passport.authenticate("local", {
      // successRedirect: "/",
      // failureRedirect: "/login"
    })
  );

  // app.post('/login',
  //   // passport.authenticate('local', { failureRedirect: '/login' }),
  //   passport.authenticate('local'),
  //   function(req, res) {
  //     console.log("GOT LOGIN");
  //     res.redirect('/');
  // });

  return app;
}

if (!module.parent) {
  main()
    .then(text => {
      // console.log("main then: ",text);
    })
    .catch(err => {
      console.error("main failed: ", err);
      // Deal with the fact the chain failed
    }); // this is the main module
}
