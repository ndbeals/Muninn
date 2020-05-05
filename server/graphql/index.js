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
  // await db.sequelize.sync();

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      // console.log('got context: ', req.isAuthenticated());
      // if (req.isAuthenticated()) {
      // return { db, user: req.user };
      // }
      return { db, req };
    },
  });
  addSchemaLevelResolveFunction(graphqlServer.schema, (root, args, { db, req }, { fieldName }) => {
    console.log('schema resolve: ', fieldName, req.isAuthenticated());
    if (req.isUnauthenticated() && !publicResolvers.includes(fieldName)) {
      throw new AuthenticationError('Illegal operation for guests.');
    }
  });

  graphqlServer.applyMiddleware({ app, cors: true });
}
