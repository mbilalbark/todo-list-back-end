const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema')
const app = express();

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://mbilalbark:asdqwe123*lac@try-rnf42.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('conneted to database');
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 