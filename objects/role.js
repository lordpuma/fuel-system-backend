const db = require("../models/index");
const { resolver } = require('graphql-sequelize');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,

} = require('graphql');

const roleType = new GraphQLObjectType({
    name: 'Role',
    description: 'A role of user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the role.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the role.',
        },
    }
});


module.exports = roleType;