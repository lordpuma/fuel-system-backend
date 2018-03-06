const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');
const db = require("../../models/index");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = new GraphQLObjectType({
    name: 'AuthMutation',
    description: 'A root for all auth related mutations',
    fields: {
        login: {
            args: {
                username: {
                    type:  GraphQLNonNull(GraphQLString),
                },
                password: {
                    type:  GraphQLNonNull(GraphQLString),
                }
            },
            type: GraphQLString,
            description: 'The name of the user.',
            async resolve(root, { username, password }) {
                const user = await db['user'].findOne({where: {
                        username: username.toLowerCase(),
                    }});

                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw new Error('Invalid credentials.');
                }

                let token = crypto.randomBytes(64).toString('hex');
                await user.addToken(await db['token'].create({token: token}));
                return token;
            }
        },
    }
});