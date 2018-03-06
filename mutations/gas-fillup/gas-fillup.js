const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');
const db = require("../../models/index");

module.exports = new GraphQLObjectType({
    name: 'GasFillUpMutation',
    description: 'A root for all gas fillup related mutations',
    fields: {
        new: {
            args: {
                liters: {
                    type:  GraphQLNonNull(GraphQLInt),
                },
                kart: {
                    type:  GraphQLNonNull(GraphQLInt),
                },
            },
            type: require('../../objects/gas-fillup'),
            description: 'Creates a new gas fillup.',
            async resolve(root, { liters, kart }) {
                return await db['gas-fillup'].create({
                    liters: liters,
                    kart: kart,
                    date: new Date(),
                });
            },
        },
    }
});