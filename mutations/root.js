const { GraphQLObjectType } = require('graphql');

const auth = require('./auth/auth');
const user = require('./user/user');
const gasPurchase = require('./gas-purchase/gas-purchase');
const gasFillup = require('./gas-fillup/gas-fillup');
const kart = require('./kart/kart');
const kartHours = require('./kart-hours/kart-hours');
const premise = require('./premise/premise');
const tickets = require('./tickets/tickets');
const electricity = require('./electricity/electricity');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  description: 'A root for all mutations',
  fields: {
    auth: {
      type: auth,
      resolve() {
        return auth;
      },
    },
    user: {
      type: user,
      resolve() {
        return user;
      },
    },
    gasPurchase: {
      type: gasPurchase,
      resolve() {
        return gasPurchase;
      },
    },
    gasFillup: {
      type: gasFillup,
      resolve() {
        return gasPurchase;
      },
    },
    kart: {
      type: kart,
      resolve() {
        return kart;
      },
    },
    kartHours: {
      type: kartHours,
      resolve() {
        return kartHours;
      },
    },
    premise: {
      type: premise,
      resolve() {
        return premise;
      },
    },
    tickets: {
      type: tickets,
      resolve() {
        return tickets;
      },
    },
    electricity: {
      type: electricity,
      resolve() {
        return electricity;
      },
    },
  },
});
