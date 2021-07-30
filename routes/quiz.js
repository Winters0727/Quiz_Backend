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

router.get('/random', async (req, res, next) => {
    try {
        const shortQuizs = await shortQuiz.find().limit(10)
        const longQuizs = await longQuiz.find().limit(10)
        const selectQuizs = await selectQuiz.find().limit(10)
        
        const quizs = [...shortQuizs, ...longQuizs, ...selectQuizs]

        if (quizs.length < 5) {
            await res.status(200).json({
                ...ResponseObject['Success']['Success'],
                'quiz': quizs
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

router.get('/boostcamp', async(req, res, next) => {
    await res.status(200).json({
        "Project(40) Contributor" : "릴레이 프로젝트(40) 기여자들",
        "1주차" : [
            "J086_박상진",
            "J126_오수완",
            "J146_이영범",
            "J151_이원주",
            "J166_이충헌",
            "K044_이원중",
            "S016_박상우",
            "S043_이정엽"
        ],
        "2주차" : [
            "J052_김정윤",
            "J056_김준호",
            "J061_김창현",
            "J091_박주원",
            "J094_박춘화",
            "K041_이상건",
            "K047_이효동",
            "S037_이남준"
        ]
    })
})

module.exports = router;