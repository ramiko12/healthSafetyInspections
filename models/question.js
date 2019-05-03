const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    answer: {
        type: String,
        required: false
    }

})


module.exports = mongoose.model('Question',questionSchema);