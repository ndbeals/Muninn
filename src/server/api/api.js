import { ApolloServer, gql, AuthenticationError } from "apollo-server-express";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";

// import bodyParser from "body-parser";
import express from "express";
import {check, query, validationResult, checkSchema, matchedData} from "express-validator";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import db from "../models";
import Op from "sequelize";

// import {events,handlers} from "../events";
import {Handler} from "../events";
import * as events from "../events";

export default async function initializeAPI(app, config, logger) {
  await db.sequelize.sync();

  const graphqlServer = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    // context: { db }
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';
     
      // try to retrieve a user with the token
      // const user = getUser(token);
      const user = await db.User.findByPk(1);
     
      // optionally block the user
      // we could also check user roles/permissions here
      // if (!req.user) throw new AuthenticationError('you must be logged in'); 
     
      // add the user to the context
      return { db, user };
     },
  });

  // const app = express();
  graphqlServer.applyMiddleware({ app });
  
  // const router = express.Router();

  // app.use(bodyParser);
  // app.use(express.json());
  
  app.post( '/notify/:token?', checkSchema({
    token: {
      // in: ['body','headers','route','query'],
      exists: true,
      isLength: {
        errorMessage: 'token should be at least 7 chars long',
        // Multiple options would be expressed as an array
        options: { min: 3 }
      }
    },
    data: {
      in: ['body'],
      exists: {
        errorMessage: "Data must be present and in JSON format.",
      },
    }
  }),
  async (req, res) => {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json( validationErrors.array() );
    }

    let validatedData = matchedData(req);
    let notifierToken = validatedData.token;

    let notifier = await db.Notifier.findOne({
      where:{
        token: notifierToken,
        // active: 
      }
    })

    if (notifier===null) {
      return res.status(400).json(errorStructure('Token not found.'));
    }
    
    await Handler.TriggerEvent('NotifierReceived', {
      notifier,
      data: req.body.data
    });

    return res.send(true)
    // return res.json(notifier);
  })

  logger.info(`Finished initializing API.`);
  return graphqlServer;
}

function errorStructure(msg) {
  return {
    value: 0,
    msg: msg,
    param: "",
    location: ""
  }
}