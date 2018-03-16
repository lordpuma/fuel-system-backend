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
      gasFillup: {
        type: new GraphQLList(gasFillup),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(db['gas-fillup'], {dataLoader: false})
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
    }
  }),
  mutation: require('../mutations/root')
});
