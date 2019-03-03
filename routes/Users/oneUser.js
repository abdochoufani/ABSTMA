const router=require('express').Router()
const passport=require("passport")






router.get('/auth/login',(req,res)=>{
    res.render('login')
})

router.get('/auth/google/logout',(req,res)=>{
    res.redirect('/')
  })
  
  
  //  route to test for passport
  router.get('/auth/login/google',passport.authenticate("google",{
      scope:['profile']
  })) 



  router.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
      res.redirect('/profile')
  })


  router.get('/profile',(req,res)=>{
      res.render('profile')
  })

  

  module.exports=router