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
    res.render('product.hbs', {product: product})
  }).catch(err =>{
    res.status(404).send('No products availabe');
    console.log(`Error occured: ${err}`);
  })
});

module.exports = router;


