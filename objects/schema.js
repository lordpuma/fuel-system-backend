const db           = require("../models/index");
const {resolver}   = require('graphql-sequelize');
const {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLList,
        GraphQLInt,

      }            = require('graphql');
const user         = require('./user');
const gasPurchases = require('./gas-purchase');
const gasFillup    = require('./gas-fillup');
const kart         = require('./kart');
const premise      = require('./premise');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(user),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['user'], {dataLoader: false})
      },
      userByMe: {
        type: user,
        resolve: resolver(db['user'], {
          dataLoader: false,
          before: async (findOptions, args) => {
            const token = await db['token'].findOne({where: {token: findOptions.graphqlContext.headers.token}});
            if (!!token) {
              const user        = await token.getUser();
              findOptions.where = {
                id: user.id,
              };
            } else {
              findOptions.where = {
                id: 0,
              };
            }
            return findOptions;
          },
        }),
      },
      gasPurchases: {
        type: new GraphQLList(gasPurchases),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['gas-purchase'], {dataLoader: false})
      },
      gasFillups: {
        type: new GraphQLList(gasFillup),
        description: "Returns all gas fillups of active karts.",
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['gas-fillup'], {
          dataLoader: false,
          after: async result => {
            const filterAsync = (array, filter) =>
              Promise.all(array.map(entry => filter(entry)))
              .then(bits => array.filter(() => bits.shift()));

            return await filterAsync(result, async gasFillup => {
              const kart = (await gasFillup.getKart());
              return !!kart ? kart.active: false
            });
          },
        })
      },
      karts: {
        type: new GraphQLList(kart),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['kart'], {dataLoader: false})
      },
      premises: {
        type: new GraphQLList(premise),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['premise'], {dataLoader: false})
      },
    }
  }),
  mutation: require('../mutations/root')
});
