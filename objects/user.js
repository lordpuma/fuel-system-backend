const db = require("../models/index");
const {resolver} = require('graphql-sequelize');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const token = require('./token');
const role = require('./role');

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    tokens: {
      type: new GraphQLList(token),
      resolve: resolver(db['user'].Tokens, {dataLoader: false})
    },
    roles: {
      type: new GraphQLList(role),
      resolve: resolver(db['user'].Roles, {dataLoader: false})
    },
    gasPurchases: {
      type: new GraphQLList(require('./gas-purchase')),
      resolve: resolver(db['user'].CreatedGasPurchases, {dataLoader: false})
    },
    gasFillups: {
      type: new GraphQLList(require('./gas-fillup')),
      resolve: resolver(db['user'].CreatedGasFillups, {dataLoader: false})
    },
    kartHours: {
      type: new GraphQLList(require('./kart-hour-count')),
      resolve: resolver(db['user'].CreatedKartHours, {dataLoader: false})
    },
    tickets: {
      type: new GraphQLList(require('./ticket-count')),
      resolve: resolver(db['user'].CreatedTickets, {dataLoader: false})
    },
  }),
});
module.exports = userType;