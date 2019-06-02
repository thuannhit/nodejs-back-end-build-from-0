const express = require('express');
const router = express.Router();
bodyParser = require('body-parser');
var registerController=require('../controllers/loginController');
var loginController=require('../controllers/registerController');
 


// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register

router.post('/register', registerController.register);
router.post('/login', loginController.login);

  // Check Validation

module.exports = router;
