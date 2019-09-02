const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = Exercise = mongoose.model('exercises', exerciseSchema);