const express = require('express');
const router = express.Router();
const TopicController = require('./TopicController');
const Topic = new TopicController();

router.get('/', Topic.getTopicList);

module.exports = router;
