const express = require('express');
const router = express.Router();

router.use('/short', require('./quiz/shortQuiz'));
router.use('/long', require('./quiz/longQuiz'));
router.use('/select', require('./quiz/selectQuiz'));

module.exports = router;