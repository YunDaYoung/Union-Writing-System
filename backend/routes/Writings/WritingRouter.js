const express = require('express');
const router = express.Router();
const WritingController = require('./WritingController');
const Writing = new WritingController();

router.get('/', Writing.getWritingList)

module.exports = router;
