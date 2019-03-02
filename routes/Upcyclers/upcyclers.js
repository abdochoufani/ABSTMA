var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/upcyclers
router.get('/', (req, res) => {
  res.send('Welcome to the page for the Upcyclers');
});

//GET Route for  => www.abstmo.com/upcyclers/login
router.get('/login', (req, res) => {
  res.send('Welcome to the Login page for Upcyclers');
});

//GET Route for  => www.abstmo.com/upcyclers/signup
router.get('/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

module.exports = router;