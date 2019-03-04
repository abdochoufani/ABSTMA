const isLoggedIn = function(req, res, next){
  if(req.signedCookies.email){
    return next();
  }
  res.redirect('/');
}

module.exports = isLoggedIn;