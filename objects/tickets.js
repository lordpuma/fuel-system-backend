const { resolver } = require('graphql-sequelize');
const db = require('../models');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const premise = require('./premise');

module.exports = new GraphQLObjectType({
  name: 'Tickets',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    premise: {
      type: new GraphQLNonNull(premise),
      resolve: resolver(db['tickets'].Premise, { dataLoader: false })
    },
  }
});