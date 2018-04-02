const { resolver } = require('graphql-sequelize');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Token',
  description: 'A login token',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    token: {
      type: GraphQLString,
    },
  },
});
