const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const selectQuizSchema = new Schema({
    quizQuestion : {
        type: String,
        required: true
    },
    quizAnswer : {
        type: Number,
        required: true
    },
    quizSelection : {
        type: Array,
        required: true
    },
    quizCategory : {
        type : Array,
        required: true
    },
    quizPlayCount : {
        type : Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('selectQuiz', selectQuizSchema);