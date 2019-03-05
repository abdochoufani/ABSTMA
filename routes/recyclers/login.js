var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Recycler = require('../../models/recycler');
const Product=require('../../models/products')

router.get("/login", (req, res)=> {
    res.render("")
})

router.post('/login', 
    upcyclerPassport.authenticate('recycler-local', { failureRedirect: '/' }),
    function(req, res) {
    res.redirect('/upcycler/profile');
});



module.exports = router