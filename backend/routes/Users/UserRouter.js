const express = require('express');
const router = express.Router();
const UserController = require('./UserController');
const User = new UserController();

router.get('/', User.getUserList);

module.exports = router;
