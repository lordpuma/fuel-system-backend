const {
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLInt,
      }  = require('graphql');
const db = require("../../models/index");

module.exports = new GraphQLObjectType({
  name: 'GasFillUpMutation',
  description: 'A root for all gas fillup related mutations',
  fields: {
    new: {
      args: {
        liters: {
          type: GraphQLNonNull(GraphQLInt),
        },
        kartId: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: require('../../objects/gas-fillup'),
      description: 'Creates a new gas fillup.',
      async resolve(root, {liters, kartId}) {
        const kart = await db['kart'].findById(kartId);
        if (!kart) {
          throw new Error("Kart does not exist");
        }
        const gasFillup = await db['gas-fillup'].create({
          liters,
          kart,
          date: new Date(),
        });
        await gasFillup.setKart(kart);

        return gasFillup;
      },
    },
  }
});