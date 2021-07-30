const Quiz = require('../../models/quiz/selectQuiz');

const ResponseObject = require('../../utils/Response');

const postSelectQuiz = async (req, res, next) => {
    try {
        await Quiz.create({...req.body});
        await res.status(201).json({...ResponseObject['Success']['Created']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const getSelectQuizAll = async (req, res, next) => {
    try {
        const options = req.query;
        let quizs;

        if (Object.keys(options).includes('limit')) {
            const limit = parseInt(options['limit']);
            delete options['limit'];
            quizs = await Quiz.find(options).limit(limit);
        } else {
            quizs = await Quiz.find(options);
        }
        
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'quizs': quizs
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const getSelectQuiz = async (req, res, next) => {
    try {
        const quizId = req.params['quizId'];
        const quiz = await Quiz.findByIdAndUpdate(quizId, {$inc : { quizPlayCount: 1 }});
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'quiz': quiz
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }

};

const updateSelectQuiz = async (req, res, next) => {
    try {
        const quizId = req.params['quizId'];
        await Quiz.findByIdAndUpdate(quizId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const deleteSelectQuiz = async (req, res, next) => {
    try {
        const quizId = req.params['quizId'];
        await Quiz.findByIdAndDelete(quizId);
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

module.exports = { postSelectQuiz, getSelectQuizAll, getSelectQuiz, updateSelectQuiz, deleteSelectQuiz };