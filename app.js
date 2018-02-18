const express = require('express');
const graphqlHTTP = require('express-graphql');
const db = require("./models/index");

db.sequelize.sync({alter: true});

const cors = require('cors');
const app = express();

const authMiddleware = async (req, res, next) => {
    const token = await db['token'].findOne({where: {token: req.headers['token']}});
    if (!!token) {
        const user = await token.getUser();
        req.user = user;
    }
    next();
};


app.use(cors());

app.all('/graphql', authMiddleware, graphqlHTTP({
    schema: require('./objects/schema'),
    graphiql: true,
    formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path
    })
}));

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphql to run queries!');
});
