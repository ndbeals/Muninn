import express from 'express';

import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
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
    const hashed_password = await bcrypt.hash('admin', 11);
    username = 'admin';
    password = 'admin';
    let user = await db.User.findOne({
      where: {
        name: username,
      },
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
  const app = express();
  // Setup express-session
  // app.use(session({ secret: '' }));
  app.use(express.json()); // for parsing application/json
  // app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
  // app.use(express.raw());
  // app.use(express.text());
  // setup passport
  app.use(
    session({
      name: 'muninn.sid',
      secret: 'keyboardcat',
      resave: false,
      saveUninitialized: false,
      secure: false,
      // cookie: {
      //   httpOnly: false,
      // },
      sameSite: 'none',
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await setupGraphQL(app);

  app.post('/login', passport.authenticate('local'), async (req, res) => {
    res.json({ hi: 'byee' });
  });

  await setupAPI(app);
  // console.log('setupapi: ', setupAPI);

  app.listen({ port: 3002 }, () => {
    logger.info(`listening on port: ${3002}`);
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
