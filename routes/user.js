const router=require('express').Router()
const Product=require("../models/products")
const Upcycler=require("../models/upcyclers")

const authCheck=(req,res,next)=>{
    if(!req.user) res.redirect("/") 
    else next()
}


router.use((req,res,next)=>{
  res.locals.currentRecycler = req.session.userId
  next()
})

  router.get('/profile',authCheck,(req,res)=>{
      debugger
      console.log(req.user)
      res.render('profileRecycler', {recycler: req.user})
    // res.send("you arenow loged in " + req.user.userName)
  })



  router.get("/product/:id", (req, res)=> {
    if(req.params.id){
        Product.findOne({_id:req.params.id}).populate('upcycler').exec((err, product)=>{
            debugger
            if(err) console.log(err)
            else  res.render('Products/singleProductPage', {product})
        })
    }
    else {
      res.redirect("/")
    }
  })



  router.get('/products',(req, res)=>{
    Product.find({}).populate('upcycler')
    .then( product => {
      res.render('Products/product.hbs', {product: product})
    }).catch(err =>{
      res.status(404).send('No products availabe');
      console.log(`Error occured: ${err}`);
    })
  });

  // hello

  module.exports=router
