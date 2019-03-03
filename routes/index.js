var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")

// root route
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/chat',(req,res)=>{
    res.render('chatForm')
})


module.exports = router;
