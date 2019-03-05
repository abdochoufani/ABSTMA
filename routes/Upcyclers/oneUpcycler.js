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



//route --> /upcycler/profile
router.get('/profile', (req, res) =>{
  if(!req.session.userId){
    res.redirect('/');
  } else {
<<<<<<< HEAD
    Upcycler.findById(req.session.userId,(err, user)=>{
      if (err) res.send(err)
       else res.render('profileUpcycler.hbs', {user});
=======
    Upcycler.findOne({email: req.signedCookies.email},(err, upcycler)=>{
      if (err) res.send(err)
      res.render('profileUpcycler.hbs', {user: upcycler});
>>>>>>> 638c72e1a4fc3a0fe572c65716808a3e76b9bd28
    });
  }
});


<<<<<<< HEAD
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
=======
//edit one upcycler
//route --> /upcycler/edit/:id
//GET to render page
router.get('/edit/:id', (req, res) => {
  Upcycler.findById(req.params.id, (err, upcycler) => {
    if (err) res.status(404).send('The requested profile was not found');
    else res.render('editUpcycler', {upcycler});
  });
});

//POST to pass information
router.post('/edit/:id', (req, res) => {
 
  let editedUpcycler = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    companyName: req.body.companyName,
    address: {
      street: req.body.street,
      city: req.body.city,
      country: req.body.country
    },
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };
  
  Upcycler.findByIdAndUpdate(req.params.id, editedUpcycler, (err) => {
    
    if(err)console.log(err);
    else res.status(200).send(`${editedUpcycler.firstName} was successfully updated`); 
    res.redirect('/upcycler/profile');
  });
});
module.exports = router;

>>>>>>> 638c72e1a4fc3a0fe572c65716808a3e76b9bd28
