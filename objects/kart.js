const db = require('../models/index');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Kart',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the kart.',
    },
    number: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    hours: {
      type: GraphQLInt,
      args: {
        date: {
          type: GraphQLString,
        },
      },
      resolve: async (obj, args) => {
        const kartId = obj.dataValues.id;
        const date = args.date;

        const kartHours = await db['kart-hours'].find({
          where: {
            kartId,
            date,
          },
        });

        return kartHours && kartHours.hours;
      },
    },
  },
});
