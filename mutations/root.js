const { GraphQLObjectType } = require('graphql');

const auth        = require('./auth/auth');
const user        = require('./user/user');
const gasPurchase = require('./gas-purchase/gas-purchase');
const gasFillup   = require('./gas-fillup/gas-fillup');
const kart        = require('./kart/kart');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  description: 'A root for all mutations',
  fields: {
    auth: {
      type: auth,
      // description: 'The auth mutation.',
      resolve() {
        return auth;
      }
    },
    user: {
      type: user,
      // description: 'The auth mutation.',
      resolve() {
        return user;
      }
    },
    gasPurchase: {
      type: gasPurchase,
      // description: 'The auth mutation.',
      resolve() {
        return gasPurchase;
      }
    },
    gasFillup: {
      type: gasFillup,
      // description: 'The auth mutation.',
      resolve() {
        return gasPurchase;
      }
    },
    kart: {
      type: kart,
      // description: 'The auth mutation.',
      resolve() {
        return kart;
      }
    },
  }
});