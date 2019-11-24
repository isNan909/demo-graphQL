const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');
const mongo = require('mongoose');

const app = express();

mongo.connect('mongodb://admin:admin123##@ds053317.mlab.com:53317/gql-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongo.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8080, () => {
    console.log('Server running succefully...')
})