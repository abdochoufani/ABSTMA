var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');

//route --> /upcycler/profile
router.get('/profile', (req, res) =>{
  if(!req.signedCookies.email){
    res.redirect('/');
  } else {
    Upcycler.findOne({email: req.signedCookies.email},(err, upcycler)=>{
      if (err) res.send(err)
      res.render('profileUpcycler.hbs', {user: upcycler});
    });
  }
});

module.exports = router;

