var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Upcycler = require('../../models/upcyclers');

//GET Route for  => www.abstmo.com/upcyclers
//show ALL UPCYCLERS
router.get('/', (req, res) => {
  // res.send('Welcome to the page for the Upcyclers');
  res.find({},(err, upcyclers) => {
    if (err) res.status(404).send('There seeem to be no upcycler available!');
    else res.render('allUpcyclers', {upcycler: upcyclers});
  });
});

//GET Route for  => www.abstmo.com/upcyclers/auth/signup
router.get('/auth/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

//POST Route for => www.abstmo.com/upcyclers/auth/signup
router.post('/auth/signup', (req, res,next) =>{
  Upcycler.findOne({ email: req.body.email }, function(err, user) {
    if(err) {
       console.log("error",err)
    }
    if (user) {
          var err = new Error('A user with that email has already registered. Please use a different email..')
         err.status = 400;
         return next(err);
    } else {
        var newUpcycler = {
          userName: req.body.userName,
          email: req.body.email,
          companyName: req.body.companyName
        }
        bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
          // Store hash in your password DB
          newUpcycler.password = hash;
          Upcycler.create(newUpcycler, (err, dbentry) => {
            if (err) {
              console.log(`error occured: ${err}`);
            } else {
              res.cookie('email', dbentry.email, { signed: true });
              // res.send(`Welcome to the community ${dbentry.userName}`);
              res.redirect('/upcycler/profile');
            }
          }).then(()=>{
            console.log("user created", newUpcycler)
          })
        }
      )
    }
 })
})

  //Store hashed password with bcrypt into the users db collection============================
   
  // bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
  //   // Store hash in your password DB
  //   newUpcycler.password = hash;
  //     debugger
  //     if(err) res.send(err)
  //     else if (Upcycler.findOne({ userName: req.body.userName}) ===true) {
  //       res.send('User Already exist, please proceed to login page!');
  //     } else {
  //       Upcycler.create(newUpcycler, (err, dbentry) => {
  //         if (err) {
  //           console.log(`error occured: ${err}`);
  //         } else {
  //           res.cookie('email', dbentry.email, { signed: true });
  //           // res.send(`Welcome to the community ${dbentry.userName}`);
  //           res.redirect('/upcycler/profile');
  //         }
  //       }).then(()=>{
  //         console.log("user created", newUpcycler)
  //       })
  //     }
  //   })
  // });

//no need GET route for login as it is in the root URL /
router.post('/auth/login', (req,res) => {
  Upcycler.findOne({userName: req.body.userName},(err,result)=>{
    debugger
    if(err){
      console.log(`error occured ${err}`);
      res.send(`An error occured`);
    } else if(!result){
      res.send('User not registered');
    }else {
      bcrypt.compare(req.body.password, result.password).then(function(pswEqual) {
        if (pswEqual) {
          res.cookie('email', result.email, {signed: true}); 
          res.redirect('/upcycler/profile');          
        } else {
          res.redirect('/');
        }
    });
    }
  });
});
//LOGOUT ROUTE UPCYCLERS=============================
router.get('/logout',(req,res) => {
  if(req.signedCookies.email){
    res.clearCookie('email');
    res.redirect('/');
  } else {
    res.send('You already logged out');
  }
})
//====================================================

module.exports = router;