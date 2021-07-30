const { postLongQuiz, getLongQuizAll, getLongQuiz, updateLongQuiz, deleteLongQuiz } = require('../../controller/quiz/longQuiz');

const express = require('express');
const router = express.Router();

router.post('/', postLongQuiz);

router.get('/', getLongQuizAll);
router.get('/:quizId', getLongQuiz);

router.put('/:quizId', updateLongQuiz);

router.delete('/:quizId', deleteLongQuiz);

module.exports = router;