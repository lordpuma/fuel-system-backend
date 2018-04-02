const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');
const db = require('../../models/index');

module.exports = new GraphQLObjectType({
  name: 'KartMutation',
  description: 'A root for all kart related mutations',
  fields: {
    new: {
      args: {
        number: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: require('../../objects/kart'),
      description: 'Creates a new kart.',
      async resolve(root, { number }) {
        return await db['kart'].create({
          number,
        });
      },
    },
    delete: {
      args: {
        id: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: GraphQLBoolean,
      async resolve(root, { id }) {
        const kart = await db['kart'].findById(id);
        if (!kart) {
          return false;
        }

        await kart.destroy();
        return true;
      },
    },
  },
});
