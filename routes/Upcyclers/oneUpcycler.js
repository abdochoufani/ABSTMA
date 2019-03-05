var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');
const Product=require('../../models/products')




router.use((req,res,next)=>{
  res.locals.currentUser = req.session.userId
  next()
})

// var requiresLogin=  function (req, res, next) {
//   if (req.session.userId) {
//     return next();
//   } else {
//     var err = new Error('You must be logged in to view this page.');
//     err.status = 401;
//     return next(err);
//   }
// }



router.get('/profile', (req, res) =>{
  if(!req.session.userId){
    res.redirect('/');
  } else {
    Upcycler.findById(req.session.userId,(err, user)=>{
      if (err) res.send(err)
       else res.render('profileUpcycler.hbs', {user});
    });
  }
});


router.get('product/create',(req,res)=>{
  Upcycler.find({},(err, user)=>{
      debugger;
      if (err) res.send("error")
      else res.render('Products/createProduct', {user});
  })
 
})

router.post("/product/:id/delete",(req,res)=>{
  Product.findByIdAndDelete(req.params.id, (err)=>{
      if(err) console.log(err)
       else res.redirect("/")
  })
})

router.get("/product/:id/edit",(req,res)=>{
  Product.findById(req.params.id,(err,product)=>{
      if (err) res.render("error", {err})
       else {  
              if(err) console.log(err)
              else res.render("Products/editProduct", {product})
      }
  })
})


router.post("/product/:id",(req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body
  const update={
    name,
    imageUrl,
     description,
     weight,
     size
  }
  Product.findByIdAndUpdate(req.params.id, update, (err) => {
      if (err){ return next(err); }
      res.redirect('/products/product');
    });
})


module.exports = router;