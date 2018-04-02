const { GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');
const db = require('../../models/index');
const getUserFromContext = require('../../utils').getUserFromContext;

module.exports = new GraphQLObjectType({
  name: 'GasPurchaseMutation',
  description: 'A root for all gas related mutations',
  fields: {
    new: {
      args: {
        price: {
          type: GraphQLNonNull(GraphQLInt),
        },
        liters: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: require('../../objects/gas-purchase'),
      description: 'Creates a new gas-purchase.',
      async resolve(root, { price, liters }, context) {
        const user = await getUserFromContext(context);
        return await db['gas-purchase'].create({
          price: price,
          liters: liters,
          date: new Date(),
          createdBy: user.id,
        });
      },
    },
  },
});
