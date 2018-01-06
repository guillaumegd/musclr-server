const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    let userToSave = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    userToSave.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/users', (req, res) => {

    User.find().then(users => {
        res.send({ users });
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.get('/users/:id', (req, res) => {
    let { id } = req.params;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else {
        User.findById(id).then(user => {
            if (!user) {
                return res.status(404).send();
            }
            res.send({ user });
        }).catch(e => {
            res.status(400).send();
        });
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };