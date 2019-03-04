var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');

router.get('/profile', (req, res) =>{
  debugger
  if(!req.signedCookies.email){
    res.redirect('/');
  } else {
    Upcycler.findOne({email: req.signedCookies.email},(err, user)=>{
      debugger
      res.render('profileUpcycler.hbs', {user});
    });
  }
});

module.exports = router;