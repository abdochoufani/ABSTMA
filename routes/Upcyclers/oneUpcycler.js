var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');

//route --> /upcycler/profile
router.get('/profile', (req, res) =>{
  if(!req.signedCookies.email){
    res.redirect('/');
  } else {
    Upcycler.findOne({email: req.signedCookies.email},(err, upcycler)=>{
      if (err) res.send(err)
      res.render('profileUpcycler.hbs', {user: upcycler});
    });
  }
});


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

