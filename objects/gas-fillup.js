const { resolver } = require('graphql-sequelize');
const db = require("../models");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const kart = require('./kart');

module.exports = new GraphQLObjectType({
  name: 'GasFillup',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the purchase.',
    },
    liters: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    kart: {
      type: new GraphQLNonNull(kart),
      resolve: resolver(db['gas-fillup'].Kart, {dataLoader: false})
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }
});