const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');
const db = require("../../models/index");

module.exports = new GraphQLObjectType({
    name: 'KartMutation',
    description: 'A root for all kart related mutations',
    fields: {
        new: {
            args: {
                number: {
                    type:  GraphQLNonNull(GraphQLInt),
                },
            },
            type: require('../../objects/kart'),
            description: 'Creates a new kart.',
            async resolve(root, { number }) {
                return await db['kart'].create({
                  number
                });
            },
        },
    }
});