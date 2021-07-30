const { postSelectQuiz, getSelectQuizAll, getSelectQuiz, updateSelectQuiz, deleteSelectQuiz } = require('../../controller/quiz/selectQuiz');

const express = require('express');
const router = express.Router();

router.post('/', postSelectQuiz);

router.get('/', getSelectQuizAll);
router.get('/:quizId', getSelectQuiz);

router.put('/:quizId', updateSelectQuiz);

router.delete('/:quizId', deleteSelectQuiz);

module.exports = router;