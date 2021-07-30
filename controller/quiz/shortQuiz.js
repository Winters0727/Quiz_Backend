const Quiz = require('../../models/quiz/shortQuiz');

const ResponseObject = require('../../utils/Response');

const postShortQuiz = async (req, res, next) => {
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

const getShortQuizAll = async (req, res, next) => {
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

const getShortQuiz = async (req, res, next) => {
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

const updateShortQuiz = async (req, res, next) => {
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

const deleteShortQuiz = async (req, res, next) => {
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

module.exports = { postShortQuiz, getShortQuizAll, getShortQuiz, updateShortQuiz, deleteShortQuiz };