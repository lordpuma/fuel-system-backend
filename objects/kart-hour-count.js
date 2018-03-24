const { resolver } = require('graphql-sequelize');
const db = require('../models');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const kart = require('./kart');

module.exports = new GraphQLObjectType({
  name: 'KartHourCount',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    hours: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    kart: {
      type: new GraphQLNonNull(kart),
      resolve: resolver(db['kart-hours'].Kart, { dataLoader: false })
    },
  }
});