const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
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
        }
    }
});