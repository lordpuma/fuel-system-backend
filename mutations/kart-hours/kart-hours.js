const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} = require('graphql');
const db = require('../../models/index');

const KartHoursInput = new GraphQLInputObjectType({
  name: 'KartHoursInput',
  fields: {
    kartId: { type: new GraphQLNonNull(GraphQLInt) },
    hours: { type: new GraphQLNonNull(GraphQLInt) },
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
      type: GraphQLList(require('../../objects/kart-hours')),
      async resolve(root, { kartHours }) {
        const promises = [];
        kartHours.forEach(({ kartId, hours }) => {
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
              res(await kartHoursToday.update({ hours }));
            } else {
              res(await db['kart-hours'].create({ kartId, hours, date: new Date() }));
            }
          }));
        });
        return Promise.all(promises);
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
        const kart = await db['kart'].findById(id);
        if (!kart) {
          return false;
        }

        await kart.destroy();
        return true;
      }
    },
  }
});