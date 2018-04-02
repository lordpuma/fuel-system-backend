const { GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');
const db = require('../../models/index');
const getUserFromContext = require('../../utils').getUserFromContext;

module.exports = new GraphQLObjectType({
  name: 'TicketsMutation',
  fields: {
    new: {
      args: {
        count: {
          type: GraphQLNonNull(GraphQLInt),
        },
        premiseId: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      type: require('../../objects/ticket-count'),
      async resolve(root, { count, premiseId }, context) {
        const premise = await db['premise'].findById(premiseId);
        if (!premise) {
          return new Error(`Premise ID ${premiseId} does not exist.`);
        }

        const ticketsToday = await db['tickets'].findOne({
          where: {
            premiseId,
            date: new Date(),
          },
        });
        const user = await getUserFromContext(context);
        const userId = (user && user.id) || null;

        if (ticketsToday) {
          return await ticketsToday.update({
            count,
            createdBy: userId,
          });
        } else {
          return await db['tickets'].create({
            premiseId,
            count,
            date: new Date(),
            createdBy: userId,
          });
        }
      },
    },
  },
});
