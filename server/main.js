import express from 'express';

import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import setupGraphQL from './graphql';
import setupAPI from './api';

import { logger } from './config';

import db from './models';

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  const user = await db.User.findByPk(id);
  cb(null, user);
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log('Local strategy??');
    // let hashed_password = await bcrypt.hash("admin", SALT_ROUNDS);
    // username = 'admin';
    // password = 'admin';
    // let user = await db.User.findOne({
    //   where: {
    //     name: username,
    //   },
    // });

    // if (user) {
    //   user = bcrypt.compareSync(password, user.password) ? user : null;
    // }

    return done(null, { test: 'yes' });
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
  const app = express();
  // Setup express-session
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(express.json()); // for parsing application/json
  // app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
  // app.use(express.raw());
  // app.use(express.text());
  // setup passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login', passport.authenticate('local'), async (req, res) => {
    console.log('got login');

    res.json({ hi: 'byee' });
  });
  await setupGraphQL(app);

  await setupAPI(app);
  // console.log('setupapi: ', setupAPI);

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
