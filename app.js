'use strict';

require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const gqlMiddelware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');
const app = express();
const port = process.env.port || 3000;


// Definiendo el esquema.
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/api', gqlMiddelware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

// app.get('/', (req, res) => {
//     res.json({
//         status: true
//     });
// });

app.listen(port, () => {
    //console.log(`Server running on port ${port}`);
    console.log(`Server is running... url -> http://localhost:${port}/api`);
});