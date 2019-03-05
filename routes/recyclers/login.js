var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var passport = require("passport")
const Recycler = require('../../models/recyclers');
const Product=require('../../models/products')

router.get("/login", (req, res,next)=> {
    next()
})

router.get("/signup",(req,res,next)=>{
    next()
})

router.post('/signup',passport.authenticate('recycler-local', { failureRedirect: '/' }),(req, res)=> {
    res.redirect('/recycler/profile');
=======
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Recycler = require('../../models/recycler');
const Product=require('../../models/products')

router.get("/login", (req, res)=> {
    res.render("")
})

router.post('/login', 
    upcyclerPassport.authenticate('recycler-local', { failureRedirect: '/' }),
    function(req, res) {
    res.redirect('/upcycler/profile');
>>>>>>> chatBranch
});



<<<<<<< HEAD

=======
>>>>>>> chatBranch
module.exports = router