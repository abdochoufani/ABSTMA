var express = require('express');
var router = express.Router();
const Product = require('../models/products');
const Upcycler  = require('../models/upcyclers');
const mongoose = require('mongoose');
const isLoggedIn = require('../isLoggedIn');

//Create a temporary route /products to show all products created by an Upcycler


// router.get("/*",isLoggedIn)
//GET Route to /product
router.get('/',isLoggedIn, (req, res)=>{
  Product.find({}).populate('upcycler')
  .then( product => {
    res.render('Products/product.hbs', {product: product})
  }).catch(err =>{
    res.status(404).send('No products availabe');
    console.log(`Error occured: ${err}`);
  })
});

router.get('/create',(req,res)=>{
  Upcycler.find({},(err, upcycler)=>{
      debugger;
      if (err) res.send("error")
      else res.render('Products/createProduct', {upcycler});
  })
 
})


router.post('/', (req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body;
  var upcycler = mongoose.Types.ObjectId(req.body.upcycler);
  const newProduct= new Product({
      name,
      description,
      imageUrl,
      upcycler,
      weight,
      size,
  })
  newProduct.save()
      .then(()=>{
          res.redirect('/products')
      })
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
      res.redirect('/product');
    });
})



module.exports = router;


