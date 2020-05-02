import { importSchema } from 'graphql-import';
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express';
// import graphqlimport from 'graphql-import';
// const { importSchema } = graphqlimport;
// import resolvers from '../api/resolvers';
import resolvers from './resolvers';

const typeDefs = importSchema('graphql/schema/schema.gql');

export default async function setupGraphQL(app) {
  console.log('setup gql');
  // await db.sequelize.sync();

  const graphqlServer = new ApolloServer({
    typeDefs,
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
      // return { db, user };
      return {};
    },
  });

  graphqlServer.applyMiddleware({ app });
}
