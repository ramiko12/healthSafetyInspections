const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const questionCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sort: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Category', questionCategorySchema);