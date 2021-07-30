const { postShortQuiz, getShortQuizAll, getShortQuiz, updateShortQuiz, deleteShortQuiz } = require('../../controller/quiz/shortQuiz');

const express = require('express');
const router = express.Router();

router.post('/', postShortQuiz);

router.get('/', getShortQuizAll);
router.get('/:quizId', getShortQuiz);

router.put('/:quizId', updateShortQuiz);

router.delete('/:quizId', deleteShortQuiz);

module.exports = router;