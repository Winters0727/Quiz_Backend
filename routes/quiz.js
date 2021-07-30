const express = require('express');
const router = express.Router();

const _ = require('lodash')

const ResponseObject = require('../utils/Response');

const shortQuiz = require('../models/quiz/shortQuiz');
const longQuiz = require('../models/quiz/longQuiz');
const selectQuiz = require('../models/quiz/selectQuiz');

router.use('/short', require('./quiz/shortQuiz'));
router.use('/long', require('./quiz/longQuiz'));
router.use('/select', require('./quiz/selectQuiz'));

router.use('/random', async (req, res, next) => {
    try {
        const shortQuizs = await shortQuiz.find().limit(10)
        const longQuizs = await longQuiz.find().limit(10)
        const selectQuizs = await selectQuiz.find().limit(10)
        
        const quizs = [...shortQuizs, ...longQuizs, ...selectQuizs]

        if (quizs.length < 5) {
            await res.status(500).json({
                ...ResponseObject['Server']['ServerError'],
                'error' : '퀴즈의 개수가 5개 미만입니다.'
            });
            return
        }

        const indexSet = _.sampleSize(Array(quizs.length).fill().map((_, index) => index), 5)

        const randomQuizs = Array.from(indexSet).map(index => quizs[index])

        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'quiz': randomQuizs
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
    
})

module.exports = router;