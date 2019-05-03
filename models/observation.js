const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const observationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    responsiblePerson: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    space: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Space'
    },
    question: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    }


})

module.exports = mongoose.model('Observation', observationSchema);