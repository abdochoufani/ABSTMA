var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');

router.get('/profile', (req, res) =>{
  res.render('profileUpcyler.hbs');
});

module.exports = router;