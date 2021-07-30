const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const longQuizSchema = new Schema({
    quizQuestion : {
        type: String,
        required: true
    },
    quizAnswer : {
        type: String,
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

module.exports = mongoose.model('longQuiz', longQuizSchema);