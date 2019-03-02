var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/users
router.get('/', function(req, res, next) {
  res.send('Welcome to Users Page');
});

//GET Route for  => www.abstmo.com/users/login
router.get('/login', (req, res) => {
  res.send('Welcome to the Login Page for users');
});

//GET Route for  => www.abstmo.com/users/signup
router.get('/signup', (req, res) => {
  res.send('Welcome to the Signup page for users');
});


module.exports = router;