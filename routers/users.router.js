const express = require('express');
const router = express.Router;
const {signUp, signIn} = require('./controllers');
router.route('/api/signUp', ).post(signUp)

