const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} = require('graphql');
const db = require('../../models/index');

module.exports = new GraphQLObjectType({
  name: 'PremiseMutation',
  fields: {
    new: {
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      type: require('../../objects/premise'),
      async resolve(root, { name }) {
        return await db['premise'].create({
          name
        });
      },
    },
    delete: {
      args: {
        id: {
          type: GraphQLNonNull(GraphQLInt),
        }
      },
      type: GraphQLBoolean,
      async resolve(root, { id }) {
        const premise = await db['premise'].findById(id);
        if (!premise) {
          return false;
        }

        await premise.destroy();
        return true;
      }
    },
  }
});