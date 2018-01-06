const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const Event = mongoose.model('Event', {
    start_date: {
        type: String,
        required: true,
        minlength: 1
    },
    end_date: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = {Event};
