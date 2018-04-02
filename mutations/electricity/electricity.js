const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const db = require('../../models/index');
const getUserFromContext = require('../../utils').getUserFromContext;

module.exports = new GraphQLObjectType({
  name: 'ElectricityMutation',
  fields: {
    new: {
      args: {
        date: {
          type: GraphQLString,
        },
        meter1: {
          type: GraphQLNonNull(GraphQLInt),
        },
        meter2: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: require('../../objects/electricity'),
      async resolve(root, { date = new Date(), meter1, meter2 }, context) {
        const electricityToday = await db['electricity'].findOne({
          where: {
            date,
          },
        });
        const user = await getUserFromContext(context);
        const userId = (user && user.id) || null;

        if (electricityToday) {
          return await electricityToday.update({
            meter1,
            meter2,
            createdBy: userId,
          });
        } else {
          return await db['electricity'].create({
            meter1,
            meter2,
            date,
            createdBy: userId,
          });
        }
      },
    },
  },
});
