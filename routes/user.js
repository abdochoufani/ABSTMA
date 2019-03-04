const router=require('express').Router()
// const passport=require("passport")

// router.get('/auth/login',(req,res)=>{
//     res.render('login')
// })

// router.get('/auth/google/logout',(req,res)=>{
//     res.redirect('/')
//   })
  
//   //  route to test for passport
//   router.get('/auth/login/google',passport.authenticate("google",{
//       scope:['profile']
//   })) 

//   router.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
//       res.redirect('/user/profile')
//   })

const authCheck=(req,res,next)=>{
    if(!req.user) res.redirect("/") 
    else next()
}
  router.get('/profile',authCheck,(req,res)=>{
      debugger
      console.log(req.user)
      res.render('profile', {recycler: req.user})
    // res.send("you arenow loged in " +req.user.userName)
  })

  

  module.exports=router