const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');
const db = require("../../models/index");
const bcrypt = require("bcrypt");
const adminGuard = require('../../guards/admin-guard');

module.exports = new GraphQLObjectType({
    name: 'UserMutation',
    description: 'A root for all user related mutations',
    fields: {
        create: {
            args: {
                username: {
                    type:  GraphQLNonNull(GraphQLString),
                },
                password: {
                    type:  GraphQLNonNull(GraphQLString),
                }
            },
            type: require('../../objects/user'),
            description: 'Creates a new user.',
            async resolve(root, { username, password }) {
                return await db['user'].create({
                    username: username,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                });
            }
        },

        logToken: {
            type: GraphQLString,
            description: 'console logs current user.',
            async resolve(root, { username, password }, req) {
                console.log(await adminGuard(req));
                return 'test';
            }
        },
    }
});