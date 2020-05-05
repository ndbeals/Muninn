import { importSchema } from 'graphql-import';
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express';
import { addSchemaLevelResolveFunction } from 'graphql-tools';

import db from '../models';
import resolvers from './resolvers';
// import graphqlimport from 'graphql-import';
// const { importSchema } = graphqlimport;
// import resolvers from '../api/resolvers';
const publicResolvers = ['login', 'logout', 'register'];

const typeDefs = importSchema('graphql/schema/schema.gql');
export default async function setupGraphQL(app) {
  // console.log('setup gql');
  // await db.sequelize.sync();

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    // context: { db }
    context: async ({ req }) => {
      // const { req } = a;
      // get the user token from the headers
      // const token = req.headers.authorization || '';

      if (req.isAuthenticated()) {
        return { db, user: req.user };
      }
      return { db, req };

      // try to retrieve a user with the token
      // const user = getUser(token);
      // const user = await db.User.findByPk(1);

      // optionally block the user
      // we could also check user roles/permissions here
      // if (!req.user) throw new AuthenticationError('you must be logged in');

      // add the user to the context
      // return { db, user };
      // return {};
    },
  });
  addSchemaLevelResolveFunction(graphqlServer.schema, (root, args, context, { fieldName }) => {
    console.log('schema resolver func', fieldName);
    if (!publicResolvers.includes(fieldName)) {
      throw AuthenticationError('Illegal operation for guests.');
    }
  });

  graphqlServer.applyMiddleware({ app });
}
