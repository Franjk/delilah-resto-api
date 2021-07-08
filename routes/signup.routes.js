const express = require('express');
const signupController = require('../controllers/signup.controller');

const router = express.Router();

console.log(signupController);

router.post('/', signupController.signup);

module.exports = router;
