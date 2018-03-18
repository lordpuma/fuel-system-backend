const express = require('express');
const graphqlHTTP = require('express-graphql');
const db = require("./models/index");

db.sequelize.sync({alter: true});

const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

const authMiddleware = async (req, res, next) => {
    const token = await db['token'].findOne({where: {token: req.headers['token']}});
    if (!!token) {
      req.user = await token.getUser();
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

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}/graphql to run queries!`);
});
