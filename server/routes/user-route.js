let express = require('express');
let userRouter = express.Router();
const { User } = require('../models/user');

userRouter.post('/', (req, res) => {
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

userRouter.get('/', (req, res) => {

    User.find().then(users => {
        res.send({ users });
    }).catch(e => {
        res.status(400).send(e);
    });
});

userRouter.get('/:id', (req, res) => {
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

module.exports = userRouter;