const bcrypt = require("bcrypt");
const express = require('express');
const graphqlHTTP = require('express-graphql');
const db = require("./models/index");

db.sequelize.sync({alter: true});

db.user.findAndCountAll().then(result => {
   if (result.count === 0) {
       db.user.create({
           username: 'admin',
           password: bcrypt.hashSync('pass', bcrypt.genSaltSync(10)),
       });
   }
});

const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}/graphql to run queries!`);
});
