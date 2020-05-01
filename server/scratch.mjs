// import gql, * as ap from 'apollo-server-express';
// console.log(ap, '\n\n', gql, '\n\n');

// import { ApolloServer } from 'apollo-server-express';

// console.log(ApolloServer);

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const { gql } = require('apollo-server-express');

// import { default as gqll } from 'apollo-server-express';
// import ApolloServer from 'apollo-server-express';
// let ApolloServer = import('apollo-server-express').then((mod) =>
//   console.log('loaded mod: ', mod)
// );
// import ApolloServer from 'apollo-server-express';
// import { default as ApolloServer } from 'apollo-server-express';
import ApolloServerExpress from 'apollo-server-express';

const { ApolloServer, gql } = ApolloServerExpress;

console.log(gql, '\n\n\n', ApolloServer);

// import Router, * as express from 'express';
// console.log('\n\n\n', Router, express);
