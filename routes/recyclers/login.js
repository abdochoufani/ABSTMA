var express = require('express');
var router = express.Router();
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
});



module.exports = router