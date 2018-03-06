const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,

} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'GasFillup',
    // description: 'A login token',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the purchase.',
        },
        liters: {
            type: new GraphQLNonNull(GraphQLInt),
            // description: 'Number of liters.',
        },
        kart: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        date: {
            type: new GraphQLNonNull(GraphQLString),
        }
    }
});