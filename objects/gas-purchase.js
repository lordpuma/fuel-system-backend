const {resolver} = require('graphql-sequelize');
const db = require('../models');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,

} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GasPurchase',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the purchase.',
    },
    liters: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdBy: {
      type: require('../objects/user'),
      resolve: resolver(db['gas-purchase'].CreatedBy, { dataLoader: false })
    },
  }),
});
