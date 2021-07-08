const express = require('express');
const loginController = require('../controllers/login.controller');

const router = express.Router();

console.log(loginController);

router.post('/', loginController.login);

module.exports = router;
