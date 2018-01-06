let express = require('express');
let eventRouter = express.Router();
const { Event } = require('../models/event');
const { ObjectID } = require('mongodb');

eventRouter.post('/', (req, res) => {
    let eventToSave = new Event({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description
    });
    eventToSave.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

eventRouter.get('/', (req, res) => {

    Event.find().then(events => {
        res.send({ events });
    }).catch(e => {
        res.status(400).send(e);
    });
});

eventRouter.get('/:id', (req, res) => {
    let { id } = req.params;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else {
        Event.findById(id).then(event => {
            if (!event) {
                return res.status(404).send();
            }
            res.send({ event });
        }).catch(e => {
            res.status(400).send();
        });
    }
});

module.exports = eventRouter;