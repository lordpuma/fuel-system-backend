const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
} = require('graphql');
const db = require('../../models/index');
const getUserFromContext = require("../../utils").getUserFromContext;

const KartHoursInput = new GraphQLInputObjectType({
  name: 'KartHoursInput',
  fields: {
    kartId: {type: new GraphQLNonNull(GraphQLInt)},
    hours: {type: new GraphQLNonNull(GraphQLInt)},
  }
});

module.exports = new GraphQLObjectType({
  name: 'KartHoursMutation',
  fields: {
    new: {
      args: {
        kartHours: {
          type: GraphQLList(KartHoursInput),
        },
      },
      type: GraphQLList(require('../../objects/kart-hour-count')),
      async resolve(root, {kartHours}, context) {
        const promises = [];
        kartHours.forEach(({kartId, hours}) => {
          promises.push(new Promise(async (res, rej) => {
            const kart = await db['kart'].findById(kartId);
            if (!kart) {
              return rej(new Error(`Kart ID ${kartId} does not exist.`));
            }

            const kartHoursToday = await db['kart-hours'].findOne({
              where: {
                kartId,
                date: new Date(),
              }
            });

            if (kartHoursToday) {
              res(await kartHoursToday.update({hours}));
            } else {
              const user = await getUserFromContext(context);
              res(await db['kart-hours'].create({
                kartId,
                hours,
                date: new Date(),
                createdBy: user.id,
              }));
            }
          }));
        });
        return Promise.all(promises);
      },
    },
  }
});