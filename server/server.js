const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', require('./routes/user-route'));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };