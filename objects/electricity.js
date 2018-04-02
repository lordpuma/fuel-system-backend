const { resolver } = require('graphql-sequelize');
const db = require('../models');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Electricity',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    meter1: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    meter2: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    createdBy: {
      type: require('../objects/user'),
      resolve: resolver(db['electricity'].CreatedBy, { dataLoader: false }),
    },
  },
});
