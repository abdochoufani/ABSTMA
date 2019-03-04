var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
const passport=require("passport")


// root route
router.get('/', function(req, res, next) {
  res.render('index');
});


//route to test chat built with socket io
router.get('/chat',(req,res)=>{
    res.render('chatForm')
})

router.get('/auth/google/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})


//  route to test for passport
router.get('/auth/login/google',passport.authenticate("google",{
    scope:['profile']
})) 



router.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/user/profile')
})


module.exports = router;
