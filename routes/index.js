var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
const recyclerPassport=require("../config/passport/passport-setup-recycler")


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

/*********************GOOGLE AUTH************************** */
//  route to test for passport
router.get('/auth/login/google',recyclerPassport.authenticate("google",{
    scope:['profile']
})) 



router.get('/auth/google/redirect',recyclerPassport.authenticate('google'),(req,res)=>{
    res.redirect('/user/profile')
})


/*********************FACEBOOK AUTH************************** */


router.get('/auth/facebook/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})


//  route to test for recyclerPassport
router.get('/auth/login/facebook',recyclerPassport.authenticate("facebook",{
  failureRedirect:"/",
    scope:['profile']
})) 



router.get('/auth/facebook/redirect',recyclerPassport.authenticate('facebook'),(req,res)=>{
    res.redirect('/user/profile')
})


module.exports = router;
