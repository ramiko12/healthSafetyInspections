const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inspectionSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    inspector: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    spaces: [
        { space: { type: Schema.Types.ObjectId, ref: 'Space' } }
    ],
    questions: [
        { question: { type: Schema.Types.ObjectId, ref: 'Question', required: true } }
    ],
    status: {
        type: String,required:true
    },
    observations: [
        {
            observation: {
                type: Schema.Types.ObjectId,
                ref: 'Observation'
            }
        }
    ]


})

module.exports = mongoose.model('Inspection', inspectionSchema);