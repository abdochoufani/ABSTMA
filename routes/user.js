const router=require('express').Router()

const authCheck=(req,res,next)=>{
    if(!req.user) res.redirect("/") 
    else next()
}

//route--> /user/profile
  router.get('/profile',authCheck,(req,res)=>{
      debugger
      console.log(req.user)
      res.render('profileRecycler', {recycler: req.user})
    // res.send("you arenow loged in " +req.user.userName)
  })

module.exports=router