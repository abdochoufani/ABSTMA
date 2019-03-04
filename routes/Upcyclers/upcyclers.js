var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');

//GET Route for  => www.abstmo.com/upcyclers
router.get('/', (req, res) => {
  res.send('Welcome to the page for the Upcyclers');
});

//GET Route for  => www.abstmo.com/upcyclers/auth/login
router.get('/auth/login', (req, res) => {
  res.send('Welcome to the Login page for Upcyclers');
});

//GET Route for  => www.abstmo.com/upcyclers/auth/signup
router.get('/auth/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

//POST Route for => www.abstmo.com/upcyclers/auth/signup
router.post('/auth/signup', (req, res) =>{
  let newUpcycler = {
    userName: req.body.userName,
    email: req.body.email,
    companyName: req.body.companyName
  }
  //Store hashed password with bcrypt into the users db collection============================
  bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
  // Store hash in your password DB
  newUpcycler.password = hash;
  Upcycler.create(newUpcycler, (err, dbentry)=>{
    if(err){
      console.log(`error occured: ${err}`);
    } else {
      res.send(`Welcome to the community ${dbentry.userName}`);
    }
  })
  });
});

module.exports = router;