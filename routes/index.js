const express = require('express');
const QuestionRouter = require('./Question');
const ScoreRouter = require('./Score');
const UserRouter = require('./User');
const router = express.Router();

router.use('/user',UserRouter)
router.use('/question',QuestionRouter);
router.use('/scores',ScoreRouter);

module.exports = router