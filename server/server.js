const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', require('./routes/user-route'));
app.use('/events', require('./routes/event-route'));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };