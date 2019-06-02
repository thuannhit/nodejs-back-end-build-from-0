const express = require('express');
const router = express.Router();
bodyParser = require('body-parser');
var webHooksControllers=require('../controllers/webHooksControllers');


// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) => res.json({ msg: 'webHooksControllers Works' }));

// @route   POST api/users/register

router.post('/register', webHooksControllers.register);
  // Check Validation

module.exports = router;
