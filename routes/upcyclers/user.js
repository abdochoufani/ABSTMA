var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');
const Product=require('../../models/products')





router.get('/profile', (req, res) =>{
  if(!req.session.user){
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  } 
    Upcycler.findById(req.session.userId,(err, user)=>{
      if (err) res.send(err)
       else res.render('profileUpcycler.hbs', {user});
    });

});


router.get('/create',(req,res)=>{
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